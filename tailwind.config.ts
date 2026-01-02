import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Tailwind가 스타일을 적용할 파일 범위 설정
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 나중에 커스텀 컬러나 폰트가 필요하면 여기에 넣습니다.
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // 2. 마크다운 스타일(prose)을 위해 반드시 필요한 플러그인
  plugins: [require("@tailwindcss/typography")],
};

export default config;
