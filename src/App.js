import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { authService } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(null)
      }

      setInit(true)
    })
  },[])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    <>
      {
        init? (
          <AppRouter 
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
          />
        ) : (
          "Initializing..."
        )
      }
    </>
  );
}

export default App;
