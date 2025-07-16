export const ruleValidate = (getValues) => ({
  email: {
    required: {
      value: true,
      message: "Email là bắt buộc",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Email không đúng định dạng",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password là bắt buộc",
    },
    minLength: {
      value: 8,
      message: "Độ dài tối thiểu phải 8 kí tự",
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: "Confirm_password là bắt buộc",
    },
    minLength: {
      value: 8,
      message: "Độ dài tối thiểu phải 8 kí tự",
    },
    validate:
      typeof getValues === "function"
        ? (value) => value === getValues("password") || "Mật khẩu không khớp"
        : undefined,
  },
});
