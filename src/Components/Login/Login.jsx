import TabSwitcher from "./TabSwitcher";

const Login = ({ onLoginSuccess }) => {
  return (
    <div className="Login min-h-screen bg-blue w-full flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">pay game</h1>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <TabSwitcher onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
