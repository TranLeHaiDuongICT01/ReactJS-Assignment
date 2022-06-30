import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

const RenderCard = ({ item, isLoading, errMess }) => {
  if (isLoading) return <Loading />;
  if (errMess || !item) return <h4 className="text-danger">{errMess}</h4>;
  return (
    <FadeTransform in transformProps={{
      exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
      <Card>
        <CardImg src={`${baseUrl}/${item?.image}`} />
        <CardBody>
          <CardTitle>{item?.name}</CardTitle>
          {item?.designation ? <CardSubtitle>{item?.designation}</CardSubtitle> : null}
          <CardText>{item?.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  )
}
const HomeComponent = (props) => {
  return (
    <div className='container'>
      <div className='row align-items-start'>
        <div className='col-12 col-md m-1'>
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesError}
          />
        </div>

        <div className='col-12 col-md m-1'>
          <RenderCard item={props.promotion}
            errMess={props.promoErr}
          />
        </div>

        <div className='col-12 col-md m-1'>
          <RenderCard item={props.leader}
            errMess={props.leaderErr}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeComponent