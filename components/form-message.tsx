export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm text-center items-center">
      {"success" in message && (
        <div className="bg-green-500 w-50 px-4 text-white p-3 rounded-lg font-bold">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="bg-red-600 w-50 px-4 text-white p-3 rounded-lg font-bold">
          {message.error}

        </div>
      )}
      {"message" in message && (
        <div className="bg-yellow-500 w-50 px-4 text-white p-3 rounded-lg font-bold">{message.message}</div>
      )}
    </div>
  );
}
