import React from "react";


const CandidateRating = ({ fullName, image, voteCount, totalVotes }) => {
  return (
    <>
      <div>
        <li className="result_candidate ">
          <div className="result_candidate-info">
            <div className="result_candidate-image">
              <img src={image} alt={fullName} />
            </div>
            <h5 className="h4">{fullName}</h5>
            <small className="h4">{`${voteCount} ${
              voteCount == 1 ? "vote" : "votes"
            }`}</small>
            <small className="h4">{`${
              voteCount > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : 0
            }%`}</small>
          </div>
        </li>
      </div>
      <style>
        {`
        



.one1{
    width: 50px;
    display: flex;
    
    flex-direction: column;
  
    align-items: center;
    justify-content: center;
    
}
.result_candidate-image{
 
    overflow: hidden;
}
.two2{
    width: 100%;
    flex-direction: column;
}
.three3{
    width: 100%;
    display: flex;
flex-direction: column;
    align-items: center;
    justify-content:center;
    /* gap: 1rem; */
}
.four4{
    display: block;
    /* flex-direction: column;
    justify-content: end;
    align-items: center; */
    /* width: 100%; */
    /* height: 10.4rem; */
    height: 100%;
    /* background: var(--color-gray-100); */
    background-color: rgb(248, 248, 248);
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
}
.four4 span{
 
     height: 100%;
    width: 100%;
    display: block;
}



.one1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .two2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .three3 {
    width: 100%;
  
    display: flex;
    justify-content: center;
    align-items: flex-end;
   
    height: 320px;  /* Controls bar height */
  }
  .one small{
    color: black;
  }
  
  .four4 {
   
    position: relative;
   
    width: 110px; /* Adjust bar width */
   
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
   
    justify-content: end;

  }
  
  .four4 span {
    
    display: block;
  
    height: 100%;
    background-color: rgb(33, 198, 33); /* Green for highest */
    text-align: center;
    color: white;
    font-weight: bold;
   
  }
  
  h5 {
    margin: 8px 0 4px;
    font-size: 16px;
    text-align: center;
  }
  
  small {
    font-size: 14px;
    color: #555;
    text-align: center;
  }
  
  /* Responsive Styling */
  @media (max-width: 768px) {
    .three3 {
      height: 320px; 
    }
    .four4 {
      width: 40px;
    }
  
    h5 {
      font-size: 14px;
    }
  
    small {
      font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    .three3 {
   height: 100px;
    }
  
    .four4 {
      width: 30px;
    
    }
  
    h5 {
      font-size: 12px;
    }
  
    small {
      font-size: 10px;
    }
  }`}
      </style>
    </>
  );
};

export default CandidateRating;
