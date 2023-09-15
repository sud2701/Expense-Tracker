import { createContext } from "react";
import { useState } from "react";
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [username, setUsername] = useState();

    return (
        <UserContext.Provider
            value={{ username, setUsername }}
        >{children}</UserContext.Provider>
    );
}

export default UserProvider;