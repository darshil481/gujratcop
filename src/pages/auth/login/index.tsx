import { useForm } from "react-hook-form";
import { LoginSchema } from "./validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useLoginUserApi } from "./services";

type LoginFormFields = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: yupResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const { loginUserApi, isLoading: loader } = useLoginUserApi();

  const onSubmit = handleSubmit(async (value) => {
  
  });

  return (
    <>
      <div className="">
        <form onSubmit={onSubmit} className="">
          <Input
            variant={true}
            type="text"
            id="email"
            name="email"
            label="Email/Username"
            register={register}
            error={errors.email}
            parentClassName="mb-6"
            autoComplete={""}
          />
          <Input<LoginFormFields>
            variant={true}
            type="password"
            id="password"
            name="password"
            label="Password"
            register={register}
            error={errors.password}
            parentClassName="mb-6"
            autoComplete="new-password"
          />
          <div className="text-right mb-5">
            <Link
              className="text-purple hover:text-purpleGradientE font-medium transition-all duration-300"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
            <Button
              type="submit"
              className="w-full py-[13px]"
              isLoading={loader}
              variant="1"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login
