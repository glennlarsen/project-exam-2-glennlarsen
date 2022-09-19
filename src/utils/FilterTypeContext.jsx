import React, { useState } from "react";

const FilterTypeContext = React.createContext([null, () => {}]);

export const FilterTypeProvider = ({children}) => {
    const [type, setType] = useState(null);
    return <FilterTypeContext.Provider value={[type, setType]}>{children}</FilterTypeContext.Provider>
}
export default FilterTypeContext;