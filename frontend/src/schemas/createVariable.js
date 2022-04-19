import * as Yup from "yup";

export const createVariableSchema = Yup.object({
  name: Yup.string().required("You must provide a variable name"),
  type: Yup.object({
    reference: Yup.string(),
    scope: Yup.string(),
    priority: Yup.string(),
  }),
  variableValues: Yup.array().of(
    Yup.object({
      name: Yup.string(),
      condition: Yup.string(),
    })
  ),
  isCustom: Yup.boolean(),
});
