import React from 'react';
import CurrentImage from './CurrentImage.jsx';
import styled, { keyframes } from 'styled-components';
import Arrow from './Arrow.jsx';

const enlarge = keyframes`
  0% {
    height: 30px;
    width: 30px;
    opacity: 80%;
  }
  100% {
    height: 32px;
    width: 32px;
    opacity: 100%;
  }
`

const HeartButton = styled.button`
  height: 30px;
  width: 30px;
  bottom: 50%;
  font-size: 15px;
  background-color: white;
  color: black;
  border-radius: 50%;
  opacity: 80%;
  :hover{ animation: 0.5s ${enlarge} 1 normal forwards};
`;

const Pictures = styled.div({
  height: '200px',
  width: '350px',
  postion: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  margin: '0 auto'
})

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

class PictureCarousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      translate: 0,
      totalWidth: 350,
      images: this.props.images,
      hovering: false
    }

    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
  }

  handleHover() {
    this.setState(this.toggleHover)
  }

  toggleHover(state) {
    return {
      hovering: !state.hovering
    }
  }

  nextImage() {
    const lastImage = this.props.images.length - 1;
    const nextIndex = this.state.currentIndex + 1;
    if (this.state.currentIndex !== lastImage) {
      this.setState({
        currentIndex: nextIndex,
        translate: nextIndex * 350
      });
    } else {
      this.setState({
        currentIndex: 0,
        translate: 0
      });
    }
  }

  previousImage() {
    const firstImage = 0;
    const lastImage = this.props.images.length - 1;
    const prevIndex = this.state.currentIndex - 1;
    if (this.state.currentIndex !== firstImage) {
      this.setState({
        currentIndex: prevIndex,
        translate: prevIndex * 350
      });
    } else {
      this.setState({
        currentIndex: lastImage,
        translate: lastImage * 350
      });
    }
  }

  render () {

    const ArrowDiv = styled.div({
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'space-between',
      transform: `translateX(-${this.props.translate}px)`,
      transition: 'transform ease-out 1s'
    });

    const HeartDiv = styled.div({
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row-reverse',
    });

    const ImageContainer = styled.div({
      transform: `translateX(-${this.state.translate}px)`,
      transition: 'transform ease-out 1s',
      height: '100%',
      width: '100%',
      display: 'flex'
    });

    let arrowDiv;
    let heartDiv;

    if (this.state.hovering) {
      arrowDiv = (<ArrowDiv>
                    <Arrow clickFunc={this.previousImage} direction="left"> </Arrow>
                    <Arrow clickFunc={this.nextImage} direction="right"> </Arrow>
                  </ArrowDiv>);
      heartDiv = (<HeartDiv>
                    <HeartButton><i className="glyphicon glyphicon-heart-empty"></i></HeartButton>
                  </HeartDiv>);
    } else {
      arrowDiv = <ArrowDiv />;
      heartDiv = <HeartDiv />;
    };

    return (
        <Pictures onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        <ImageContainer>
          {this.state.images.map(image => {
              return (
              <Image
                key = {image}
                src = {image}
              /> )
            })}
        </ImageContainer>
          {arrowDiv}
        </Pictures>
    )
  }
}

export default PictureCarousel;
          {/* <CurrentImage
            images= {this.props.images}
            currentIndex= {this.state.currentIndex}
            translate= {this.state.translate}
          ></CurrentImage> */}
         {/* <CurrentImage
            images= {this.props.images}
            leftClick= {this.previouseImage}
            rightClick= {this.nextImage}
            currentIndex= {this.state.currentIndex}
            translate= {this.state.translate}
            >
          </CurrentImage> */}

{/* <ImageContainer>
{this.state.images.map(image => {
  return (
    <Image
    key = {image}
    src = {image}
    />
    )
  })}
</ImageContainer>
<Arrow clickFunc={this.previouseImage} direction='left'></Arrow>
<Arrow clickFunc={this.nextImage} direction='right'></Arrow> */}

{/* <CurrentImage images={this.props.images} translate={this.state.translate} totalWidth={this.state.totalWidth}>
</CurrentImage> */}

