import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/auth/useAuth";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthed } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthed) {
      navigate("/login", { replace: false });
    }
  }, [navigate, isAuthed, loading]);

  return children;
}

export default PrivateRoute;
