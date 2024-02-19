import React from "react";

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselCaption,
  MDBCarouselElement,
} from "mdb-react-ui-kit";

export default function HomeCarousal() {
  return (
    <MDBCarousel showControls className="my-1 " >
      <MDBCarouselInner>
        <MDBCarouselItem className="active ">
          <MDBCarouselElement
            className="carousalimage1"
            style={{ height: "650px", width: "100%" }}
          />
          <MDBCarouselCaption className="text-white">
            <h3 className="display-4 "><b>Your pet is safe with us. </b></h3>
            <p >
              
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement
            className="carousalimage3 "
            style={{ height: "650px", width: "100%" }}
          />
          <MDBCarouselCaption className="text-white">
            <h3 className="display-4 " ><b>Food and attires</b></h3>
            <p className="text-dark">
            All brands foods and attire available 
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        
        <MDBCarouselItem>
          <MDBCarouselElement
            className="carousalimage2"
            style={{ height: "650px", width: "100%" }}
          />
          <MDBCarouselCaption className="text-white">
            <h3 className="display-4"><b>Home away from home </b></h3>
            <p >
              Too busy to guardian your pet ! don't worry we got your back ..  Home for your pet
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
}
