"use client";
import { use, useState } from "react";
import { isValid, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coffee, Eye, EyeOff, Sliders } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import coffee from "../coffee.json";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { motion } from "framer-motion";
const stepOneSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};
const stepTwoSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Must include at least one number" })
    .regex(/[\W_]/, { message: "Must include at least one special character" }),
});

export default function MultiStepSignup() {
  const cookies = useCookies();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formStepOne = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { username: "" },
  });

  const formStepTwo = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: { email: "", password: "" },
  });
  const { isValid } = formStepOne.formState;
  const { isValid: stepTwoIsValid } = formStepTwo.formState;

  function handleStepOne(values: z.infer<typeof stepOneSchema>) {
    setFormData((prev) => ({ ...prev, username: values.username }));
    setStep(2);
  }

  async function handleStepTwo(values: z.infer<typeof stepTwoSchema>) {
    const mergedData = {
      username: formData.username,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(mergedData),
        }
      );
      const data = await response.json();
      cookies.set("accessToken", data.result);
      cookies.set("refreshToken", data.result);

      setErrorMessage(data.message);
      console.log(errorMessage);
      if (response.ok) {
        setIsSubmitting(true);
        console.log("Toast should appear now!");
        toast.success("You successfully signed up!");
        setIsSubmitting(false);
        router.push("/profile");
      } else {
        console.error("Signup failed");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signed up failed try again");
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      className="font-[family-name:var(--font-inter)] flex"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeScaleVariants} 
    >
      <div className="h-screen w-1/2 bg-[#FBBF24] items-center rounded-br-3xl rounded-tr-3xl relative ">
        <Toaster richColors position="top-center" />
        <div className="flex gap-2 absolute left-32 top-16">
          <Coffee size={30} />
          <p className="text-[#09090B] text-[21px] font-bold">Buy Me Coffee</p>
        </div>
        <div className="h-[70%] rounded-full flex flex-col items-center justify-center mt-32 gap-5">
          <div className="bg-[#D9770680] rounded-full h-[300px] w-[300px] flex items-center justify-center">
          <svg
              width="301"
              height="300"
              viewBox="0 0 241 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1_5019"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="241"
                height="240"
              >
                <circle cx="120.5" cy="120" r="120" fill="white" />
              </mask>
              <g mask="url(#mask0_1_5019)">
                <circle
                  opacity="0.5"
                  cx="120.5"
                  cy="120"
                  r="120"
                  fill="#D97706"
                />
                <path
                  d="M61.0874 116.025C61.5468 113.78 63.2354 111.987 65.4492 111.394L147.841 89.3173C150.054 88.7241 152.413 89.4326 153.934 91.1473L164.918 103.534L57.7684 132.244L61.0874 116.025Z"
                  fill="white"
                />
                <path
                  d="M51.9952 137.967C51.4186 135.815 52.6956 133.603 54.8475 133.026L167.841 102.75C169.993 102.173 172.205 103.45 172.782 105.602L175.914 117.291C176.49 119.443 175.213 121.655 173.061 122.231L60.0676 152.508C57.9157 153.085 55.7039 151.808 55.1273 149.656L51.9952 137.967Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M161.368 125.363L71.7489 149.376L111.963 250.311L177.008 232.882L161.368 125.363ZM69.6609 141.584C64.9955 142.834 62.4666 147.875 64.2543 152.362L104.469 253.297C105.983 257.097 110.101 259.162 114.051 258.104L179.096 240.675C183.047 239.616 185.581 235.769 184.992 231.721L169.351 124.202C168.656 119.422 163.945 116.32 159.28 117.57L69.6609 141.584Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M93.1942 63.7292C94.5467 65.4994 94.208 68.0309 92.4378 69.3834C91.9237 69.7762 91.0331 70.9779 90.9165 72.1915C90.8693 72.6832 90.9432 73.1938 91.2755 73.767C91.6268 74.3729 92.3929 75.2591 94.0683 76.2264C96.5561 77.6628 98.2799 79.5387 99.2115 81.7492C100.128 83.9228 100.123 86.0517 99.814 87.77C99.5081 89.4695 98.8833 90.9016 98.3753 91.8689C98.1152 92.364 97.8696 92.7679 97.6808 93.0592C97.586 93.2056 97.5042 93.3255 97.4406 93.4163C97.4087 93.4617 97.3812 93.5001 97.3588 93.531L97.329 93.5718L97.317 93.588L97.3117 93.5951L97.3093 93.5983C97.3081 93.5999 97.307 93.6014 94.0788 91.1827L97.307 93.6014C95.9712 95.3843 93.443 95.7467 91.6601 94.4109C89.8861 93.0818 89.5184 90.5722 90.8306 88.7909C90.8316 88.7895 90.8328 88.7878 90.8343 88.7856C90.8459 88.7691 90.8725 88.7305 90.9104 88.672C90.987 88.5538 91.1041 88.3629 91.2329 88.1177C91.5026 87.6041 91.7603 86.9727 91.8739 86.3413C91.9841 85.7286 91.936 85.2593 91.7772 84.8824C91.6339 84.5425 91.2517 83.9159 90.0344 83.213C87.4456 81.7183 85.5149 79.9154 84.2963 77.8137C83.0587 75.6793 82.6896 73.464 82.8859 71.4202C83.2563 67.563 85.5986 64.4559 87.54 62.9727C89.3102 61.6202 91.8417 61.9589 93.1942 63.7292Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M108.581 48.1315C109.933 49.9018 109.595 52.4333 107.824 53.7858C107.31 54.1785 106.42 55.3802 106.303 56.5939C106.256 57.0855 106.33 57.5962 106.662 58.1693C107.014 58.7752 107.78 59.6614 109.455 60.6287C111.943 62.0652 113.667 63.9411 114.598 66.1516C115.514 68.3251 115.51 70.4541 115.201 72.1724C114.895 73.8719 114.27 75.304 113.762 76.2712C113.502 76.7664 113.256 77.1702 113.068 77.4616C112.973 77.6079 112.891 77.7278 112.827 77.8186C112.795 77.8641 112.768 77.9024 112.746 77.9334L112.716 77.9742L112.704 77.9904L112.698 77.9974L112.696 78.0007C112.695 78.0022 112.694 78.0037 109.466 75.585L112.694 78.0037C111.358 79.7866 108.83 80.149 107.047 78.8132C105.273 77.4841 104.905 74.9746 106.217 73.1932C106.218 73.1919 106.22 73.1901 106.221 73.188C106.233 73.1715 106.259 73.1328 106.297 73.0744C106.374 72.9561 106.491 72.7652 106.62 72.52C106.889 72.0064 107.147 71.375 107.261 70.7436C107.371 70.131 107.323 69.6616 107.164 69.2847C107.021 68.9448 106.638 68.3182 105.421 67.6154C102.832 66.1207 100.902 64.3177 99.683 62.216C98.4454 60.0816 98.0763 57.8663 98.2726 55.8226C98.6431 51.9654 100.985 48.8582 102.927 47.3751C104.697 46.0226 107.228 46.3612 108.581 48.1315Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
          <p className="text-[32px] font-bold text-[#09090B]">
            Fund your creative work
          </p>
          <p className="text-[18px] font-normal text-[#09090B] max-w-[450px] text-center">
            Accept support. Start a membership. Setup a shop. It's easier than you think.
          </p>
        </div>
      </div>
      {step === 1 ? (
        <div className="w-1/2 flex justify-center items-center flex-col gap-5 relative">
          <div>
            <p className="text-[#09090B] text-[32px] font-semibold">
              Create your account
            </p>
            <p className="text-[#71717A] text-[14px] font-semibold">
              Choose a username for your page
            </p>
          </div>
          <Form {...formStepOne}>
            <form
              onSubmit={formStepOne.handleSubmit(handleStepOne)}
              className="space-y-6 w-[300px]"
            >
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...formStepOne.register("username")}
                    placeholder="Enter username"
                    className="w-[366px]"
                  />
                </FormControl>
                <FormMessage>
                  {formStepOne.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
              <Button
                type="submit"
                className={`w-[366px] py-2 rounded-md text-white border-none ${
                  isValid
                    ? "bg-black hover:bg-black hover:text-white"
                    : "bg-[#707073] hover:bg-[#707073] hover:text-white"
                }`}
              >
                Next
              </Button>
              <Link href={"/login"}>
                <Button className="absolute top-10 right-[160px] w-[83px] h-[45px] border bg-black rounded-md text-white text-sm">
                  Login
                </Button>
              </Link>
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-1/2 flex justify-center items-center flex-col gap-5 relative">
          <div className="min-w-[400px] ml-8">
            <p className="text-[#09090B] text-[32px] font-semibold">
              Welcome, {formData.username}
            </p>
            <p className="text-[#71717A] text-[16px] font-semibold">
              Connect email and set a password
            </p>
          </div>
          <Form {...formStepTwo}>
            <form
              onSubmit={formStepTwo.handleSubmit(handleStepTwo)}
              className="space-y-6"
            >
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-[366px]"
                    {...formStepTwo.register("email")}
                    placeholder="Enter email"
                  />
                </FormControl>
                <FormMessage>
                  {formStepTwo.formState.errors.email?.message}
                  {errorMessage}
                </FormMessage>
              </FormItem>
  
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...formStepTwo.register("password")}
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      className="absolute top-2 right-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage>
                  {formStepTwo.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
  
              <Button
                type="submit"
                className={`w-[366px] py-2 rounded-md text-white border-none ${
                  stepTwoIsValid
                    ? "bg-black hover:bg-black hover:text-white"
                    : "bg-[#707073] hover:bg-[#707073] hover:text-white"
                }`}
              >
                Continue
              </Button>
  
              <Link href={"/login"}>
                <Button className="absolute top-10 right-[160px] w-[83px] h-[45px] border bg-black rounded-md text-white text-sm">
                  Login
                </Button>
              </Link>
            </form>
          </Form>
        </div>
      )}
      {isSubmitting && (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
          <Lottie
            animationData={coffee}
            loop={true}
            className="w-[500px] h-[500px]"
          />
        </div>
      )}
    </motion.div>
  );
}
