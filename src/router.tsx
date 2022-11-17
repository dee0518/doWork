import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { LOGIN, MAIN, MYPAGE, SIGNUP } from './Constant';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import MyPage from './pages/MyPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={LOGIN}>
      <Route index element={<Login />} />
      <Route path={SIGNUP} element={<SignUp />} />
      <Route path={MAIN} element={<Main />} />
      <Route path={MYPAGE} element={<MyPage />}></Route>
    </Route>
  )
);

// function AppRouter(props) {
//   const { refreshUser, isLoggedIn, userObj } = props;
//   const navigator = useNavigate();

//   const [addUser, setAddUser] = useState(false);

//   const onSignUpUser = result => {
//     setAddUser(Boolean(result));
//     navigator(MAIN);
//   };

//   return (
//     <Wrapper className="wrapper">
//       {isLoggedIn && addUser && <Header />}
//       <Routes>
//         {isLoggedIn && addUser ? (
//           <>
//             <Route path={MAIN} element={<Schedule userObj={userObj} />}>
//               <Route path={MAINSUB} element={<Schedule userObj={userObj} />} />
//             </Route>
//             <Route path={MYPAGE} element={<MyPage userObj={userObj} />}>
//               <Route path={MYPAGESUB} element={<MyPage userObj={userObj} />} />
//             </Route>
//           </>
//         ) : (
//           <Route path={LOGIN} element={<Login onSignUpUser={onSignUpUser} />} />
//         )}
//       </Routes>
//     </Wrapper>
//   );
// }

export default router;
