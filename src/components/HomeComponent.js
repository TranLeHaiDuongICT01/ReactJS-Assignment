import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Loading from './LoadingComponent';
const RenderCard = ({ item, isLoading, errMess }) => {
  if (isLoading) return <Loading />;
  if (errMess || !item) return <h4 className="text-danger">{this.props.errMess}</h4>;
  return (
    <Card>
      <CardImg src={item?.image} />
      <CardBody>
        <CardTitle>{item?.name}</CardTitle>
        {item?.designation ? <CardSubtitle>{item?.designation}</CardSubtitle> : null}
        <CardText>{item?.description}</CardText>
      </CardBody>
    </Card>
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
          <RenderCard item={props.promotion} />
        </div>

        <div className='col-12 col-md m-1'>
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  )
}

export default HomeComponent