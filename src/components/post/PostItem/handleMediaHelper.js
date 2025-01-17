export const handleMedia = (post, isImagePost, imageLoaded, shouldPreload, handleImageLoaded) => {
  
    const obtainUrl = (post) => {
      if(post?.media_embed?.content) {
        const iframeString = post?.media_embed?.content;
        const srcMatch = iframeString.match(/src="([^"]+)"/);
        const videoUrl = srcMatch ? srcMatch[1] : null;
        return videoUrl;
      } else {
        return false;
      };
    };
    
    
    const width = window.screen.width > 500 ? (post.thumbnail_width * 3) || 320 : (post.thumbnail_width * 2) || 300;
    const height = window.screen.width > 500 ? (post.thumbnail_height * 3) || 320 : (post.thumbnail_height * 2) || 300;

    const linkWidth = window.screen.width > 500 ? (post.thumbnail_width * 1.2) || 220 : (post.thumbnail_width) || 200;
    const linkHeight = window.screen.width > 500 ? (post.thumbnail_height * 1.2) || 220 : (post.thumbnail_height) || 200;

    let slideIndex = 1;
        showSlides(slideIndex, `gallery${post.id}`);
        
        // Next/previous controls
        function plusSlides(n, galleryId) {
          showSlides(slideIndex += n, galleryId);
        }
        
        // Thumbnail image controls
        function currentSlide(n, galleryId) {
          showSlides(slideIndex = n, galleryId);
        }
        

        function showSlides(n, galleryId) {
          let slides = document.querySelectorAll(`#${galleryId} .slides`);
          let dots = document.querySelectorAll(`#${galleryId} .dot`);
          let prev = document.querySelector(`#${galleryId} .prev`);
          let next = document.querySelector(`#${galleryId} .next`);
      
          if (!slides.length || !dots.length || !prev || !next) {
              return; // Exit the function if elements are not found
          }
      
          if (n > slides.length) {slideIndex = 1}
          if (n < 1) {slideIndex = slides.length}
          for (let i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";  
          }
          for (let i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
          }
          //slides[slideIndex-1].style.display = "block";
          slides[slideIndex-1].style.display = "flex";
          slides[slideIndex-1].style.justifyContent = "center";
          slides[slideIndex-1].style.alignItems = "center";
          dots[slideIndex-1].className += " dot_active";
      
          // Hide previous button on the first slide and next button on the last slide
          prev.style.display = slideIndex === 1 ? "none" : "block";
          console.log(slides.length)
          next.style.display = slideIndex === slides.length ? "none" : "block";
      }
    
    if (isImagePost() && !post?.url?.includes('gallery') && !post.is_video && !post?.post_hint?.includes('video') && post?.post_hint !== 'link') {
      return (
        <img
          src={post.url.includes('jpeg') || post.url.includes('png') || post.url.includes('jpg') || post.url.includes('gif') ? post.url : post.thumbnail}
          alt={post.title}
          className={`post_img ${imageLoaded ? 'loaded' : ''}`}
          loading={shouldPreload ? 'eager' : 'lazy'}
          onLoad={handleImageLoaded}
          style={{width: width, height: height}}
        />
      );
    } else if (isImagePost() && !post?.url.includes('gallery') && !post.is_video && !post.post_hint?.includes('video') && post?.post_hint === 'link') {
      return (
        <a className="link" href={post.url} target='blank'>
          <img
            src={post?.url.includes('jpeg') || post?.url.includes('png') || post.url.includes('jpg') || post?.url.includes('gif') ? post.url : post.thumbnail}
            alt={post.title}
            className={`post_img ${imageLoaded ? 'loaded' : ''}`}
            loading={shouldPreload ? 'eager' : 'lazy'}
            onLoad={handleImageLoaded}
            style={{width: linkWidth, height: linkHeight}}
          />
          <span className="source">{post.url}</span>
        </a>
      );
    }
     else if (post.is_video && !post?.domain === 'youtu.be') {
      return (
        <video 
          style={{width: width, height: height}}
          className='post_vid'
          loading='lazy'
          controls>
          <source src={post.media?.reddit_video?.fallback_url} type='video/mp4' />
        </video>
      )
    } else if(post?.domain === 'youtu.be' && !post.is_video) {
      return (
      <iframe 
          title={post.title} 
          src={obtainUrl(post)}
          style={{width: width, height: height}}
          loading="lazy"
          className="post_vid">
      </iframe>
      )
    } else if(post.url && post.url.includes('gallery') && post.gallery_data && post.media_metadata) {
      const imgOrigins = Object.values(post.media_metadata).map(p => p.s.u);

      
      let widths = [320];
      for(let i = 0; i < Object.values(post.media_metadata).length; i++) {
        if(Object.values(post.media_metadata)[i].p[2].x) {
          widths.push(Object.values(post.media_metadata)[i].p[2].x);
        }
      };
      //let maxWidth = Math.max(...widths);
      console.log(widths);
      
      let heights = [320];
      for(let i = 0; i < Object.values(post.media_metadata).length; i++) {
          heights.push(Object.values(post.media_metadata)[i].p[2].y);
      };
      let maxHeight = Math.max(...heights);
      console.log(maxHeight);

      if (imgOrigins) {
        const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
        const matches = imgOrigins.map(p => p.match(imageRegex));
        if (matches) {
          const imageUrls = matches.map(p => p[0]);

          return (
            
            <div id={`gallery${post.id}`} className="slideshow-container">
                {console.log(Object.values(post.media_metadata))}
                {console.log(Object.values(post.media_metadata)[0].p)}
                {console.log(Object.values(post.media_metadata)[0].p[2])}
                {console.log(Object.values(post.media_metadata)[0].p[2].x)}
                {imageUrls.map((imageUrl, index) => (
                    <div className="slides fade" key={index} style={{height:maxHeight, width: '100%', maxHeight: '400px'}}>
                        <div className="numbertext">{index + 1} / {imageUrls.length}</div>
                        <img src={imageUrl.slice(0, 8) + 'i' + imageUrl.slice(15)} 
                        alt="comment-img" 
                        style={{maxHeight: '100%', maxWidth: '100%'}}
                        onLoad={handleImageLoaded}
                        className={`post_img ${imageLoaded ? 'loaded' : ''}`}
                        loading={shouldPreload ? 'eager' : 'lazy'}
                        />
                    </div>
                ))}
                <span className="prev" onClick={() => plusSlides(-1, `gallery${post.id}`)}>&#10094;</span>
                <span className="next" onClick={() => plusSlides(1, `gallery${post.id}`)}>&#10095;</span>
                <div className="dots">
                    {imageUrls.map((_, index) => (
                        <span key={index} className="dot" onClick={() => currentSlide(index + 1, `gallery${post.id}`)}></span>
                    ))}
                </div>
            </div>
          );
        }
      }
      return null;
    } else if(!isImagePost() && post.url) {
      return (
        <></>
      );
    }
  };