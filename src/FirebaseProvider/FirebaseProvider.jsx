import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebaseConfig";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();


const FirebaseProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async( email, password, name, photoURL) => {
        setLoading(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(cred.user, {
                displayName: name || cred.user.displayName || null, 
                photoURL: photoURL || null, 
            });
            
            setLoading(false);
            return cred.user;
        } catch (error) {
            
            console.error('Error creating user:', error.message);
            setLoading(false);
            throw error; 
        }
    }

    function updateUserProfile(name, image) {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        });
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setUser(null);
        return signOut(auth);
    };

    useEffect(() => {
        const auth = getAuth();
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null); 
                setLoading(false);
            }
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const allValue = {
        user,
        loading,
        createUser,
        updateUserProfile,
        signInUser,
        googleLogin,
        logOut,
    }
    return (
        <AuthContext.Provider value={allValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;