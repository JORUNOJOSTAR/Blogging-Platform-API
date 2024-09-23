import { getData,manipulateData } from "../DAO/dbConnection.js";

function validChecker(reqObj){
    const validationResult = {
      errMsg : ""
    }
    const check = ["title","content","category","tags"];
    check.forEach(element=>{
      const checkElement = reqObj[element];
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
        createStatus["blogData"] =  await getData(`
            INSERT INTO posts (title,content,category,tags,createdat,updatedat)
               VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
            `,[reqObj.title,reqObj.content,reqObj.category,reqObj.tags,currentDate,currentDate]);
        
        createStatus.isSuccess = createStatus["blogData"].length>0;
        createStatus["errMsg"] = createStatus.isSuccess?"":"Sorry.Error occur in database";
        return createStatus;
    }

    static async upDateBlog(target_id,reqObj){
      const updateStatus = {isSuccess:false};
      updateStatus["errMsg"] = validChecker(reqObj).errMsg;
      if(updateStatus["errMsg"]){
          return updateStatus; 
      }
      const currentDate = new Date();
      updateStatus["blogData"] =  await getData(`
          UPDATE posts 
              SET title=$1,content=$2,category=$3,tags=$4,updatedat=$5
          WHERE id = $6 RETURNING *
          `,[reqObj.title,reqObj.content,reqObj.category,reqObj.tags,currentDate,target_id]);
      console.log(updateStatus);
      updateStatus.isSuccess = updateStatus["blogData"].length>0;
      updateStatus["errMsg"] = updateStatus.isSuccess?"":"Sorry.Error occur in database";
      return updateStatus;
    }

    static async getBlogById(target_id){
        const id = target_id || "-1";
        const getStatus = {isExist:false};
        getStatus["blogData"] = await getData("SELECT * FROM posts WHERE id = $1",[id]);
        getStatus.isExist = getStatus["blogData"].length>0;
        return getStatus;
    }

    static async getBlogs(term){
      const filter = term?`WHERE LOWER(title) LIKE '%${term}%' OR LOWER(content) LIKE '%${term}%' OR LOWER(category) LIKE '%${term}%'`:"";
      const blogData = await getData(`SELECT * FROM posts ${filter}`);
      return blogData;
    }

    static async deleteBlog(target_id){
        const id = target_id || "-1";
        let deleteStatus = await manipulateData("DELETE FROM posts WHERE id = $1",[id]);
        return deleteStatus>0;
    }
}