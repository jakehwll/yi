import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1024px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        slidein: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        slidein: "slidein .1s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
