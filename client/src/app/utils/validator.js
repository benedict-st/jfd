import * as yup from "yup";
import "yup-phone";
export const controlledFormSchemaReg = yup.object().shape({
    email: yup
        .string()
        .required("Электронная почта обязательна для заполнения")
        .email("Электронная почта введен некорректно"),
    password: yup
        .string()
        .required("Пароль обязателен для заполнения")
        .min(4, "Пароль должен быть больше 4-х символов")
        .matches(
            /^((?=.*[A-Z]))/,
            "Пароль должен содержать хотя бы одну заглавную букву"
        )
        .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
        .matches(
            /(?=.*[!@#$%&*])/,
            "Пароль должен содержать хотя бы один спецсимвол"
        ),
    phone: yup
        .string()
        .required("Телефон в формате без 8 (910.......)")
        .phone(),
    fio: yup.string().required("ФИО обязательно для заполнения")
});

export const controlledFormSchemaAuth = yup.object().shape({
    email: yup
        .string()
        .required("Электронная почта обязательна для заполнения")
        .email("Электронная почта введен некорректно"),
    password: yup
        .string()
        .required("Пароль обязателен для заполнения")
        .min(4, "Пароль должен быть больше 4-х символов")
        .matches(
            /^((?=.*[A-Z]))/,
            "Пароль должен содержать хотя бы одну заглавную букву"
        )
        .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
        .matches(
            /(?=.*[!@#$%&*])/,
            "Пароль должен содержать хотя бы один спецсимвол"
        )
});

export const controlledFormSchemaComment = yup.object().shape({
    content: yup
        .string()
        .required("Заполните отзыв")
        .min(5, "Хотя бы 5 символов")
});
export const controlledFormSchemaEditPersona = yup.object().shape({
    fio: yup.string().required("Имя надо заполнить"),
    address: yup.string().required("Адрес надо заполнить"),
    phone: yup.string().required("Телефон в формате без 8 (910.......)").phone()
});

export const controlledFormSchemaOrder = yup.object().shape({
    category: yup.string().required("Нужно выбрать категорию"),
    product: yup.string().required("Нужно выбрать продукт"),
    orderData: yup.date().required("Нужно выбрать дату"),
    kolvo: yup
        .number()
        .required("Нужно выбрать количество")
        .moreThan(0, "Количество больше нуля")
});
