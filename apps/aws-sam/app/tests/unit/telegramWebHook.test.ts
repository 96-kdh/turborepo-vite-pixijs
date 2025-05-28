import { APIGatewayProxyEvent } from "aws-lambda";

import { telegramWebHookHandler } from "api/bot/telegram-webhook/post";

// 1) Telegraf 모듈 전체를 factory 클로저로 mock 처리
jest.mock("telegraf", () => {
   // 클로저 스코프 안에서 선언된 mock 함수들
   const mockHandleUpdate = jest.fn().mockResolvedValue(undefined);
   const mockStart = jest.fn();
   const mockCommand = jest.fn();
   const mockSetMyCommands = jest.fn().mockResolvedValue(undefined);

   // Telegraf 클래스를 완전 대체
   const Telegraf = jest.fn().mockImplementation(() => ({
      handleUpdate: mockHandleUpdate,
      start: mockStart,
      command: mockCommand,
      telegram: {
         setMyCommands: mockSetMyCommands,
      },
   }));

   // __mocks__ 프로퍼티로 테스트 영역에서 꺼내 쓸 수 있게 내보냄
   return {
      Telegraf,
      __mocks__: { mockHandleUpdate, mockStart, mockCommand, mockSetMyCommands },
   };
});

// mock 처리된 telegraf 모듈에서 __mocks__를 가져옵니다
const { __mocks__ } = require("telegraf");
const { mockHandleUpdate } = __mocks__;

beforeAll(() => {
   process.env.BOT_TOKEN = "TEST_BOT_TOKEN";
   process.env.CLIENT_URL = "https://example.com";

   // jest.spyOn(console, 'log').mockImplementation(() => {});
   jest.spyOn(console, "error").mockImplementation(() => {});
});

// 최소 필수 필드를 채운 테스트용 이벤트 헬퍼
function makeEvent(body: string | null, headers: Record<string, string>): APIGatewayProxyEvent {
   return {
      body,
      headers,
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: "",
      httpMethod: "POST",
      path: "/telegram-webhook",
      isBase64Encoded: false,
   };
}

describe("telegramWebHookHandler (Telegraf 모킹, var 없이)", () => {
   beforeEach(() => {
      mockHandleUpdate.mockClear();
   });

   it("유효한 update를 넘기면 200/ok 반환", async () => {
      const update = {
         update_id: 1,
         message: {
            message_id: 1,
            from: { id: 1, is_bot: false, first_name: "A" },
            chat: { id: 1, type: "private" },
            date: 123,
            text: "hi",
         },
      };

      const event = makeEvent(JSON.stringify(update), { "Content-Type": "application/json" });
      const res = await telegramWebHookHandler(event);

      expect(res.statusCode).toBe(200);
      expect(res.body).toBe("ok");
      expect(mockHandleUpdate).toHaveBeenCalledWith(update);
   });

   it("body가 null이면 500 반환", async () => {
      const event = makeEvent(null, { "Content-Type": "application/json" });
      const res = await telegramWebHookHandler(event);

      expect(res.statusCode).toBe(400);
      expect(res.body).toBe("bad request");
      expect(mockHandleUpdate).not.toHaveBeenCalled();
   });

   it("잘못된 JSON이면 500 반환", async () => {
      const event = makeEvent("invalid-json", { "Content-Type": "application/json" });
      const res = await telegramWebHookHandler(event);

      expect(res.statusCode).toBe(500);
      expect(res.body).toBe("error");
      expect(mockHandleUpdate).not.toHaveBeenCalled();
   });
});
