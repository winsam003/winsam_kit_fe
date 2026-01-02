import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore 불러오기 추가
// import { getAnalytics } from "firebase/analytics"; // SSR 환경에서는 선택사항

const firebaseConfig = {
  apiKey: "AIzaSyAFQxc_kuDDSJT4SeY7MSPNtqu-QJWjqwY",
  authDomain: "winsam-toolbox.firebaseapp.com",
  projectId: "winsam-toolbox",
  storageBucket: "winsam-toolbox.firebasestorage.app",
  messagingSenderId: "287939057514",
  appId: "1:287939057514:web:b529e667544f9b6be5b713",
  measurementId: "G-M7J624RGNG",
};

// Next.js 특성상 서버/클라이언트 중복 초기화를 방지하기 위한 로직
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };
