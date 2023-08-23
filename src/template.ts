export default {
  EMAIL: (val: string) => new RegExp(/^[0-9a-zA-Z]([-_.+]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i).test(val) || "not a valid email",
  ENGLISH_ONLY: (val: string) => RegExp(/^[a-zA-Z]+$/).test(val) || "only english allowed",
}