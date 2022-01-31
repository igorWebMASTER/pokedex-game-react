import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome Inválido")
    .required("Nome Inválido")
    .matches(/^[aA-zZ\s]+$/, "Somente Letras no nome"),
  hp: yup
    .number()
    .min(1, "HP Inválido")
    .required("Digite um HP"),
  weight: yup
    .number()
    .min(1, "Peso Inválido")
    .required("Campo requerido"),
  height: yup
    .number()
    .min(1, "Altura Inválida")
    .required("Campo requerido"),
  types: yup
    .array()
    .required("Campo requerido"),
  ability1:  yup
    .string()
    .required("Campo requerido"),
  ability2:  yup
    .string()
    .required("Campo requerido"),
  ability3:  yup
    .string()
    .required("Campo requerido"),
  ability4:  yup
    .string()
    .required("Campo requerido"),
  defense:  yup
    .number()
    .min(1, "Defesa Inválida")
    .required("Campo requerido"),
  attack:  yup
    .number()
    .min(1, "Ataque Inválido")
    .required("Campo requerido"),
  specialDefense:  yup
  .number()
  .min(1, "Defesa especial Inválido")
   .required("Campo requerido"),
  specialAttack:  yup
  .number()
  .min(1, "Ataque especial Inválido")
  .required("Campo requerido"),
});
