import { getData,manipulateData } from "../DAO/dbConnection.js";

function validChecker(reqObj){
    const validationResult = {
      errMsg : ""
    }
    const check = ["title","content","category","tags"];
    check.forEach(element=>{
      const checkElement = reqObj["element"];
      let isValidArray = true;
      let validResult = false;

      const isExist = Boolean(checkElement);
      if(isExist && typeof checkElement ==='object'){
        isValidArray = checkElement.length>0;
      }
      validResult = isExist && isValidArray;
      if(!validResult){
        validationResult.errMsg +=  `${element} is not valid.\n`
      }
    })
    return validationResult;
}

export class Blog{

    static async createBlog(reqObj){
        const createStatus = {isSuccess:false};
        createStatus["errMsg"] = validChecker(reqObj).errMsg;
        if(createStatus["errMsg"]){
            return createStatus; 
        }
        const currentDate = new Date();
        createBlog["blogData"] =  await getData(`
            INSERT INTO posts (title,content,category,tags,createdAt,updatedAt)
               VALUES ($1,$2,$3,$4,$5,$6)
               ON CONFLICT(id)
            DO UPDATE SET
               title = EXCLUDED.title,
               content = EXCLUDED.content,
               category = EXCLUDED.category,
               tags = EXCLUDED.tags,
               updatedAt = EXCLUDED.updatedAt
            RETURNING *
            `,[reqObj.title,reqObj.content,reqObj.category,reqObj.tags,currentDate]);
        
        createStatus.isSuccess = createBlog["blogData"].length>0;
        createStatus["errMsg"] = createStatus.isSuccess?"":"Sorry.Error occur in database";
        return createStatus;
    }

    static async getBlogById(reqObj){
        const id = reqObj.id || "-1";
        const getStatus = {isExist:false};
        getStatus["blogData"] = getData("SELECT * FROM posts WHERE id = $1",[id]);
        getStatus.isExist = getStatus["blogData"].length>0;
        return getStatus;
    
    }

    static async getBlogs(term){

    }

    static async deleteBlog(reqObj){
        const id = reqObj.id || "-1";
        let deleteStatus = await manipulateData("DELETE FROM posts WHERE id = $1",[id]);
        return deleteStatus>0;
    }
}