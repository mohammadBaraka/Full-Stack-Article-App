"use client";
import FadeSlideUp from "@/app/components/animations/FadeSlideUp";
import StaggeredList, {
  StaggeredItem,
} from "@/app/components/animations/StaggeredList";
import {
  isLoggedInVar,
  LoginMutation,
} from "@/app/graphql/Mutations/AuthMutation";
import { msgError, msgSuccess } from "@/app/utils/msg";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login, data, error, loading } = LoginMutation(inputs);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login();
      isLoggedInVar(true);
      msgSuccess("Login Success");
      setTimeout(() => {
        router.push("/");
      });
    } catch (error) {
      msgError(error?.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <StaggeredList>
        <StaggeredItem>
          <Card className="bg-white text-articleGray-800 dark:bg-articleGray-800 dark:text-white border border-articleGray-200 dark:border-articleGray-700 shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <FadeSlideUp delay={0.1}>
              <Typography
                variant="h4"
                className="text-articleGray-800 dark:text-white"
              >
                Login
              </Typography>
            </FadeSlideUp>
            <FadeSlideUp delay={0.2}>
              <Typography className="mt-1 font-normal text-gray-600 dark:text-gray-300">
                Welcome Again to our article site
              </Typography>
            </FadeSlideUp>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                <FadeSlideUp delay={0.3}>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Email
                  </Typography>
                </FadeSlideUp>
                <FadeSlideUp delay={0.4}>
                  <Input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={inputs.email}
                    size="lg"
                    placeholder="example@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </FadeSlideUp>
                <FadeSlideUp delay={0.5}>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                </FadeSlideUp>
                <FadeSlideUp delay={0.6}>
                  <Input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={inputs.password}
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </FadeSlideUp>
              </div>

              <FadeSlideUp delay={0.7}>
                <Button
                  type="submit"
                  className="mt-6"
                  fullWidth
                  loading={loading ? true : false}
                >
                  Login
                </Button>
              </FadeSlideUp>
            </form>
          </Card>
        </StaggeredItem>
      </StaggeredList>
    </div>
  );
};

export default Login;
