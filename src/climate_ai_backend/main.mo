import Result "mo:base/Result";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Int "mo:base/Int";
import Time "mo:base/Time";
actor {

  type History={
    id:Text;
    response:Text;
    request:Text;
  };

  type User={
    id:Principal;
    history:[History];
  };


//define data storages 

let aiuserstorages=HashMap.HashMap<Principal,User>(1,Principal.equal,Principal.hash);

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

//enter serach results
public shared ({caller}) func enter_user_search(request:Text,response:Text):async Result.Result<Text,Text>{

      let id:Text=Int.toText(Time.now());

     
    let new_search:History={
        id;
        response;
        request;

      };
  switch (aiuserstorages.get(caller)){

    case(null){
      return #err("failed")
    };
    case(?his){

      //update users history
      let historybuffer=Buffer.fromArray<History>(his.history);

      historybuffer.add(new_search);

      let updatedhistory=Buffer.toArray(historybuffer);

      let updateduser:User={
        id=caller;
        history=updatedhistory;
      };
      aiuserstorages.put(caller,updateduser);
      return #ok(response)
    }
  }
};

//get all users history


     public query func getAllHistory():async [User]{
     
       


      return Iter.toArray(aiuserstorages.vals());
     };
  

//register user

public shared ({caller}) func registeruser():async Text{

  //verify tthat users is not registered

  switch(aiuserstorages.get(caller)){

    case (null){
      let new_user:User={
        id=caller;
        history=[];
      };

      aiuserstorages.put(caller,new_user);
      return "welcome"
    };
    case(?_found){
      return "welcome back"
    };
  };

};

//clear all history

public shared ({caller}) func clear_history():async Text{

  switch(aiuserstorages.get(caller)){
    case (null){
      return "failed"
    };
    case(?_found){

      let newupdateduser:User={
        id=caller;
        history=[];
      };
      aiuserstorages.put(caller,newupdateduser);
      return "cleared"
    }
  }

}

};
