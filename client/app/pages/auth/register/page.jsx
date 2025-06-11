"use client";

import FadeSlideUp from "@/app/components/animations/FadeSlideUp";
import StaggeredList, {
  StaggeredItem,
} from "@/app/components/animations/StaggeredList";
import { RegisterMutatin } from "@/app/graphql/Mutations/AuthMutation";
import { msgError, msgSuccess } from "@/app/utils/msg";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    img: null,
    password: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  console.log(inputs);

  // Target elements with the "name" attribute
  const { register, data, error, loading } = RegisterMutatin();
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setInputs((values) => ({
        ...values,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
    }
  };
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    register({
      variables: {
        name: inputs.name,
        email: inputs.email,
        img: inputs.img,
        password: inputs.password,
      },
    })
      .then(() => {
        msgSuccess("user created successfully");
        router.push("/pages/auth/login");
      })
      .catch((err) => {
        msgError(err.message);
      });
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
                Sign Up
              </Typography>
            </FadeSlideUp>
            <FadeSlideUp delay={0.2}>
              <Typography className="mt-1 font-normal text-gray-600 dark:text-gray-300">
                Nice to meet you! Enter your details to register.
              </Typography>
            </FadeSlideUp>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <FadeSlideUp delay={0.3}>
                {previewImage ? (
                  <div className=" flex justify-center ">
                    <Image
                      src={previewImage}
                      width={100}
                      height={100}
                      alt="preview image"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                ) : (
                  <div className=" flex justify-center">
                    <input
                      type="file"
                      id="avatar"
                      name="img"
                      hidden
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="avatar"
                      className="text-center  cursor-pointer"
                    >
                      <Image
                        src={"/avatar-user.png"}
                        width={100}
                        height={100}
                        alt="avatar image"
                      />
                    </label>
                  </div>
                )}
              </FadeSlideUp>
              <div className="mb-1 flex flex-col gap-6">
                <FadeSlideUp delay={0.4}>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Name
                  </Typography>
                </FadeSlideUp>
                <FadeSlideUp delay={0.5}>
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={inputs?.name}
                    size="lg"
                    placeholder="your name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </FadeSlideUp>
                <FadeSlideUp delay={0.6}>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Email
                  </Typography>
                </FadeSlideUp>
                <FadeSlideUp delay={0.7}>
                  <Input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={inputs?.email}
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </FadeSlideUp>
                <FadeSlideUp delay={0.8}>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                </FadeSlideUp>
                <FadeSlideUp delay={0.9}>
                  <Input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={inputs?.password}
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </FadeSlideUp>
              </div>
              <FadeSlideUp delay={0.1}>
                <Button
                  type="submit"
                  className="mt-6"
                  fullWidth
                  loading={loading ? true : false}
                >
                  sign up
                </Button>
              </FadeSlideUp>
            </form>
          </Card>
        </StaggeredItem>
      </StaggeredList>
    </div>
  );
};

export default Register;
