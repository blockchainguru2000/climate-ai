import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { climate_ai_backend } from "declarations/climate_ai_backend";
import { Button } from "../components/ui/button";
const MainPage = () => {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  //welcome the user
  climate_ai_backend.registeruser().then((result) => {
    console.log(result, "user");
  });

  const genAi = new GoogleGenerativeAI(
    process .env.GOOGLE_API_KEY
  );

  //get users history

  useEffect(() => {
    climate_ai_backend.getAllHistory().then((result) => {
      console.log(result, "users history");
      setHistory(result[0].history);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const model = genAi.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `explain the  climate change based on the following topic ${search} and should be less than 300 words`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text, "uiuiuiouiiuo");
    setResponse(text);

    //add to history
    climate_ai_backend.enter_user_search(search, text).then((result) => {
      console.log(result, "update history");
    
    });

    //reclaim  back the data
    climate_ai_backend.getAllHistory().then((result) => {
      console.log(result[0].history, "users history2");
      setHistory(result[0].history);
    });
  };
  const handleclerahistory=()=>{
    climate_ai_backend.clear_history().then((result) => {
      console.log(result, "clear history");
    
    });
     climate_ai_backend.getAllHistory().then((result) => {
      console.log(result[0].history, "users history2");
      setHistory(result[0].history);
    });
  }
  return (
    <div className="w-[1200px] h-[100vh] mx-auto mb-5 px-2 bg-purpl-600">
      <div className="flex h-full">
        <div className="w-[350px]">
          <div className="">
            <div className="flex space-x-3 items-center">
              <h1 className="font-bold text-purple-700">Your questions</h1>
              <button>logout</button>
            </div>
            <div className="mt-3">
              {!history? (
                <div className="text-center">
                  <h1 className="font-bold">No search history</h1>
                </div>
              ) : (
                <div>
                  {history.map((val, _index) => (
                    <div className="" key={_index}>
                      <p className="font-bold text-sm truncate cursor-pointer" onClick={()=>setResponse(val.response)}>
                        {val.request}
                      </p>
                    </div>
                  ))}

                  <div className="">
                    <Button onClick={handleclerahistory}>clear history</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=""></div>
        </div>
        <div className="flex-1 h-full px-3 border-r">
          <h2 className="font-bold text-purple-700">ask me</h2>
          <div className="">
            <form action="" className="flex space-x-2" onSubmit={handleSearch}>
              <textarea
                name=""
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id=""
                className="border rounded-md w-full "
              ></textarea>
              <button type="submit">ask</button>
            </form>
          </div>

          <div className="py-3 px-2 bg-gray-400 rounded-md my-4">
            {response}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
