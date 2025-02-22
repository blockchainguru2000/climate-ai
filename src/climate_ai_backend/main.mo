import Result "mo:base/Result";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Int "mo:base/Int";
import Time "mo:base/Time";
actor {

  type ChatHistory={
    id:Text;
    ai:Text;
    user:Text;
  };

  type User={
    id:Principal;
    history:[ChatHistory];
  };


//define data storages 

let ai=HashMap.HashMap<Principal,User>(1,Principal.equal,Principal.hash);


//add mesage
public shared ({caller}) func add_message(request:Text,response:Text):async Result.Result<Text,Text>{

      let id:Text=Int.toText(Time.now());

     
    let new_search:ChatHistory={
        id;
        ai=response;
        user=request;

      };
  switch (ai.get(caller)){

    case(null){
      return #err("failed")
    };
    case(?his){

      //update users history
      let historybuffer=Buffer.fromArray<ChatHistory>(his.history);

      historybuffer.add(new_search);

      let updatedhistory=Buffer.toArray(historybuffer);

      let updateduser:User={
        id=caller;
        history=updatedhistory;
      };
      ai.put(caller,updateduser);
      return #ok(response)
    }
  }
};

//get all users history


     public query func getChatHistory():async [User]{
     
       


      return Iter.toArray(ai.vals());
     };
  

//register user

public shared ({caller}) func registeruser():async Text{

  //verify tthat users is not registered

  switch(ai.get(caller)){

    case (null){
      let new_user:User={
        id=caller;
        history=[];
      };

      ai.put(caller,new_user);
      return "welcome"
    };
    case(?_found){
      return "welcome back"
    };
  };

};

//clear all history

public shared ({caller}) func clearchathistory():async Text{

  switch(ai.get(caller)){
    case (null){
      return "failed"
    };
    case(?_found){

      let newupdateduser:User={
        id=caller;
        history=[];
      };
      ai.put(caller,newupdateduser);
      return "cleared"
    }
  }

}

};