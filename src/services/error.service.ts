export function errorService(error: any) {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error("Error desconocido");
}
