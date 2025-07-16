import { message } from "antd";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ruleValidate } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "../../apis/auth.api";
import { omit } from "lodash";
import { toast } from "react-toastify";
import { AppContext } from "../../context/app.context";
import Button from "../../Components/Button/Button";
export default function Register() {
  const [isLocked, setIsLocked] = useState(false);
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();
  const rules = ruleValidate(getValues);
  const registerAccountMutation = useMutation({
    mutationFn: (body) => registerAccount(body),
  });
  const onSubmit = handleSubmit((data) => {
    if (isLocked) return; // Đã bấm rồi thì không bấm nữa
    setIsLocked(true); // Khóa lại ngay
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(" Thành công:", data);
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate("/");
      },
      onError: (error) => {
        const formError = error.response?.data.data;
        if (formError) {
          // setError("email", {
          //   message: formError.email,
          //   type: "Server",
          // });
          toast.error(formError.email);
        }
      },
    });
    onSettled: () => {
      setIsLocked(false); // Dù thành công hay lỗi đều mở khóa lại
    };
  });

  return (
    <div className="bg-orange-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="rounded bg-white p-10 shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng kí</div>
              <div className="mt-8">
                <input
                  type="email"
                  className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                  placeholder="Email"
                  {...register("email", rules.email)}
                />
              </div>

              <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                {errors.email?.message}
              </div>

              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="on"
                  className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                  placeholder="Password"
                  {...register("password", rules.password)}
                />

                <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                  {errors.password?.message}
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="on"
                  className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                  placeholder="confirm_password"
                  {...register("confirm_password", rules.confirm_password)}
                />

                <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                  {errors.confirm_password?.message}
                </div>
              </div>
              <div className="mt-2">
                <Button
                  type="submit"
                  className="flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                  isLoading={isLocked}
                  disabled={isLocked}
                >
                  Đăng kí
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link className="ml-1 text-red-400" to="/login">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
