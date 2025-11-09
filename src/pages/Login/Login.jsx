
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import MuiButton from "@/components/Button/Button";
import Field from "@/components/Field/Field";
import logo from "@/assets/Images/FFC-logo.png";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import routers from "../../router/router";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { mobile: "", password: "" } });

  const onSubmit = async (values) => {
    const payload = {
      username: values?.mobile,
      password: values?.password,
    };
    try {
      const res = await authService.login(payload);
      if (res?.success) {
        console.log("res", res);
        const combined = `${values?.mobile}:${values?.password}`;
        const base64encoded = btoa(combined);
        localStorage.setItem("token", base64encoded);
        localStorage.setItem("userInfo", JSON.stringify(res?.userDetail?.data));
        localStorage.setItem("permissions", JSON.stringify(res?.Permissions));
        localStorage.setItem("referralToken", res?.referralToken);
        navigate(routers.privateRoutes.DASHBOARD.path);
        toast.success("Login Successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className={styles.loginWrapper}>
        <img src={logo} alt="" />
        <h2 className={styles.headding}>Get Started with BETA Field Force</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Field
            controller={{
              name: "mobile",
              rules: { required: "Required Field" },
              control,
              render: ({ field }) => (
                <Input
                  {...field}
                  label="Email Id / Mobile No"
                  error={errors.mobile}
                  size="small"
                  variant="standard"
                  placeholder="Email Id / Mobile No"
                />
              ),
            }}
            error={errors.mobile}
          />
          <Field
            controller={{
              name: "password",
              control,
              rules: { required: "Required field" },
              render: ({ field }) => (
                <Input
                  {...field}
                  error={errors.password}
                  type="password"
                  showPasswordToggle
                  label="Password"
                  size="small"
                  placeholder="Password"
                  variant="standard"
                />
              ),
            }}
            error={errors.password}
          />
          <div className={styles.btnConteiner}>
            <MuiButton
              className={styles.loginBtn}
              size="small"
              type="submit"
              loadingPosition="start"
              fullWidth
              loading={isSubmitting}
            >
              Sing In
            </MuiButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
