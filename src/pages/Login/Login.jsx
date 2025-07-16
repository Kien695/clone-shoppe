import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ruleValidate } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginAccount } from "../../apis/auth.api";
import { useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import Button from "../../Components/Button/Button";

export default function Login() {
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
  const loginAccountMutation = useMutation({
    mutationFn: (body) => loginAccount(body),
  });
  const onSubmit = handleSubmit((data) => {
    if (isLocked) return; // Đã bấm rồi thì không bấm nữa
    setIsLocked(true); // Khóa lại ngay
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        // console.log(data);
        const email = data?.data?.email || "Đăng nhập thành công!";
        toast.success(email);
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate("/");
      },
      onError: (error) => {
        const formError = error.response?.data.data;
        if (formError) {
          setError("password", {
            message: formError.password,
            type: "Server",
          });
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
              <div className="text-2xl">Đăng nhập</div>
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
                <Button
                  type="submit"
                  className="flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                  isLoading={isLocked}
                  disabled={isLocked}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                <Link className="ml-1 text-red-400" to="/register">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
