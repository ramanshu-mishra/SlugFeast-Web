"use client";
import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  FormEvent,
} from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginFields {
  username: string;
  email: string;
}

export interface LoginErrors {
  username?: string;
  email?: string;
}

export type AuthStep = "login" | "otp";

export interface OtpVerifyPayload {
  username: string;
  email: string;
  otp: string;
}

export interface AuthFlowProps {
  /** Called when OTP verification is complete */
  onVerified?: (payload: OtpVerifyPayload) => void;
  /** Called after login form is submitted (e.g. trigger send OTP API) */
  onLoginSubmit?: (fields: LoginFields) => void | Promise<void>;
  /** Number of OTP digits — defaults to 6 */
  otpLength?: number;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLogin(fields: LoginFields): LoginErrors {
  const errors: LoginErrors = {};
  if (!fields.username.trim()) errors.username = "Username is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 340, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  }),
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner: React.FC = () => (
  <motion.span
    className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
  />
);

// ─── Field Component ──────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  error,
  onChange,
}) => (
  <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="text-[11px] font-semibold tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-500"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={onChange}
      className={[
        "h-11 rounded-xl border px-4 text-sm bg-zinc-50 dark:bg-zinc-800/60",
        "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
        "outline-none transition-all duration-150 focus:ring-2 focus:ring-offset-0",
        error
          ? "border-red-400 dark:border-red-500 focus:ring-red-300/40"
          : "border-zinc-200 dark:border-zinc-700 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-zinc-300/40 dark:focus:ring-zinc-600/40",
      ].join(" ")}
    />
    <AnimatePresence mode="wait">
      {error && (
        <motion.p
          key="error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-xs text-red-500 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── Login View ───────────────────────────────────────────────────────────────

interface LoginViewProps {
  direction: number;
  onSubmit: (fields: LoginFields) => Promise<void>;
}

const LoginView: React.FC<LoginViewProps> = ({ direction, onSubmit }) => {
  const [fields, setFields] = useState<LoginFields>({ username: "", email: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange =
    (key: keyof LoginFields) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const errs = validateLogin(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await onSubmit(fields);
    setLoading(false);
  };

  return (
    <motion.div
      key="login"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-zinc-400 dark:text-zinc-500">
            Welcome 
          </span>
          <h1 className="text-[24px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            Create your Slugfeast{" "}
            <em className="italic font-normal text-zinc-400 dark:text-zinc-500">
              account
            </em>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            We'll send a verification code to confirm it's you.
          </p>
        </motion.div>

        {/* Fields */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Field
            id="username"
            label="Username"
            value={fields.username}
            placeholder=""
            autoComplete="username"
            error={errors.username}
            onChange={handleChange("username")}
          />
          <Field
            id="email"
            label="Email address"
            type="email"
            value={fields.email}
            placeholder=""
            autoComplete="email"
            error={errors.email}
            onChange={handleChange("email")}
          />

          <motion.button
            variants={fadeUp}
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.015 } : {}}
            whileTap={!loading ? { scale: 0.975 } : {}}
            className={[
              "mt-1 h-11 rounded-xl text-sm font-semibold tracking-wide",
              "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900",
              "transition-opacity duration-150",
              loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner /> Sending code…
              </span>
            ) : (
              "Continue →"
            )}
          </motion.button>
        </form>

        {/* Divider + Sign up */}
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400 dark:text-zinc-600">or</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Create one
            </button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── OTP View ─────────────────────────────────────────────────────────────────

interface OtpViewProps {
  email: string;
  otpLength: number;
  direction: number;
  onVerify: (otp: string) => void;
  onBack: () => void;
}

const OtpView: React.FC<OtpViewProps> = ({
  email,
  otpLength,
  direction,
  onVerify,
  onBack,
}) => {
  const [digits, setDigits] = useState<string[]>(Array(otpLength).fill(""));
  const [hasError, setHasError] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const focusCell = (index: number): void => refs.current[index]?.focus();

  const handleChange = useCallback(
    (index: number) =>
      (e: ChangeEvent<HTMLInputElement>): void => {
        const val = e.target.value.replace(/\D/g, "").slice(-1);
        setDigits((prev) => {
          const next = [...prev];
          next[index] = val;
          return next;
        });
        setHasError(false);
        if (val && index < otpLength - 1) focusCell(index + 1);
      },
    [otpLength]
  );

  const handleKeyDown = useCallback(
    (index: number) =>
      (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
          focusCell(index - 1);
        }
      },
    [digits]
  );

  const handlePaste = useCallback(
    (index: number) =>
      (e: ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
        setDigits((prev) => {
          const next = [...prev];
          pasted
            .split("")
            .slice(0, otpLength - index)
            .forEach((ch, j) => { next[index + j] = ch; });
          return next;
        });
        focusCell(Math.min(index + pasted.length, otpLength - 1));
      },
    [otpLength]
  );

  const handleVerify = (): void => {
    const otp = digits.join("");
    if (otp.length < otpLength) { setHasError(true); return; }
    setVerified(true);
    onVerify(otp);
  };

  return (
    <motion.div
      key="otp"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Code sent
          </span>
        </motion.div>

        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-zinc-400 dark:text-zinc-500">
            Verify identity
          </span>
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            Enter the{" "}
            <em className="italic font-normal text-zinc-400 dark:text-zinc-500">
              {otpLength}-digit code
            </em>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Sent to{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {email}
            </span>
          </p>
        </motion.div>

        {/* OTP Cells */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
          <motion.div
            className="flex gap-2.5"
            animate={hasError ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {digits.map((digit, i) => (
              <motion.input
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={handleChange(i)}
                onKeyDown={handleKeyDown(i)}
                onPaste={handlePaste(i)}
                autoFocus={i === 0}
                aria-label={`Digit ${i + 1} of ${otpLength}`}
                whileFocus={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className={[
                  "w-11 h-14 rounded-xl border text-center text-xl font-semibold caret-transparent",
                  "outline-none transition-colors duration-150 focus:ring-2 focus:ring-offset-0",
                  "text-zinc-900 dark:text-zinc-100",
                  hasError
                    ? "bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-500 focus:ring-red-300/40"
                    : verified
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-500 focus:ring-emerald-300/40"
                    : "bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-zinc-300/40",
                ].join(" ")}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {hasError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-500 dark:text-red-400"
              >
                Please fill in all {otpLength} digits.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Verify Button */}
        <motion.button
          variants={fadeUp}
          type="button"
          disabled={verified}
          onClick={handleVerify}
          whileHover={!verified ? { scale: 1.015 } : {}}
          whileTap={!verified ? { scale: 0.975 } : {}}
          className={[
            "h-11 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300",
            verified
              ? "bg-emerald-500 text-white cursor-default"
              : "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 cursor-pointer",
          ].join(" ")}
        >
          {verified ? "Verified ✓" : "Verify & continue →"}
        </motion.button>

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          className="text-center text-sm text-zinc-500 dark:text-zinc-400"
        >
          Didn't receive it?{" "}
          <button
            type="button"
            onClick={onBack}
            className="font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Go back
          </button>{" "}
          ·{" "}
          <button
            type="button"
            className="font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Resend code
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// ─── Root AuthFlow ────────────────────────────────────────────────────────────

export const AuthFlow: React.FC<AuthFlowProps> = ({
  onVerified,
  onLoginSubmit,
  otpLength = 6,
}) => {
  const [step, setStep] = useState<AuthStep>("login");
  const [direction, setDirection] = useState<number>(1);
  const [loginFields, setLoginFields] = useState<LoginFields>({
    username: "",
    email: "",
  });

  const goTo = (next: AuthStep): void => {
    setDirection(next === "otp" ? 1 : -1);
    setStep(next);
  };

  const handleLoginSubmit = async (fields: LoginFields): Promise<void> => {
    setLoginFields(fields);
    await onLoginSubmit?.(fields);
    goTo("otp");
  };

  const handleVerify = (otp: string): void => {
    onVerified?.({ ...loginFields, otp });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 px-4">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none h-full w-full absolute  flex items-center justify-center overflow-hidden"
      >
        <div className="size-[500px] rounded-full bg-zinc-300/40 dark:bg-zinc-800/50 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-300/40 dark:shadow-zinc-950/70 px-8 py-10"
      >
        <AnimatePresence custom={direction} mode="wait">
          {step === "login" ? (
            <LoginView
              key="login"
              direction={direction}
              onSubmit={handleLoginSubmit}
            />
          ) : (
            <OtpView
              key="otp"
              email={loginFields.email}
              otpLength={otpLength}
              direction={direction}
              onVerify={handleVerify}
              onBack={() => goTo("login")}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

