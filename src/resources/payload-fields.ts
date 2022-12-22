import { isEmpty } from "./is-empty";

type payloadFields = {
  [key: string]: any;
};

export function checkPayloadFields(
  payload: payloadFields | undefined,
  fields: string[]
): void {
  const paths: string[] = [];
  const msg = "must not be null";

  fields.forEach((field) => {
    if (isEmpty(payload![field])) paths.push(field);
  });

  if (paths.length > 0) throw new Error(`path: [${paths.toString()}] ${msg}`);

  return;
}
