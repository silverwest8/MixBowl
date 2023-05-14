import { Card } from '@tremor/react';
import LoginForm from './form';

export default function LoginPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-md h-full flex items-center justify-center">
      <Card>
        <h1 className="text-center font-bold text-lg mb-4">
          Cocktell 관리자 페이지 로그인
        </h1>
        <LoginForm />
      </Card>
    </main>
  );
}
