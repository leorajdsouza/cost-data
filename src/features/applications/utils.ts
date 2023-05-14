import { ORDER } from "../../enums";
 
const formatDate  = (date: string)=>{ 
  const [day,month,year] = date?.split("/");
  return `${year}-${month}-${day}`
}

 const sortData = <T>(data: T[], order:string, key: string) => {
  /*
    Create a new array as .sort mutates the array 
   */
  const cloneData = [...data]
   return cloneData.sort((a , b) => { 
      const dateA = new Date(formatDate((a as any)[key])).getTime();
      const dateB = new Date(formatDate((b as any)[key])).getTime(); 
      if (order === ORDER.asc) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }); 
  };

  export {sortData,formatDate}