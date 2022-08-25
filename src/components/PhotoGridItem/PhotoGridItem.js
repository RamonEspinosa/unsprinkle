import React from "react";
import styled from "styled-components/macro";

const getSrcSet = (src, extension, sets = 3) => {
  const type = src.split(".").pop();
  const name = src.replace(`.${type}`, "");
  const srcSet = Array.from({ length: sets }, (_, i) => {
    const index = i + 1;
    return `${name}${index !== 1 ? `@${index}x` : ""}${extension} ${index}x`;
  });
  return srcSet.join(",\n");
};

const PhotoGridItem = ({ id, src, alt, tags }) => {
  const avifSrc = getSrcSet(src, ".avif");
  const highDpiSrc = getSrcSet(src, ".jpg");
  return (
    <article>
      <Anchor href={`/photos/${id}`}>
        <div>
          <picture>
            <source type="image/avif" srcSet={avifSrc}></source>
            <source type="image/jpeg" srcSet={highDpiSrc}></source>
            <Image src={src} alt={alt} />
          </picture>
        </div>
      </Anchor>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    </article>
  );
};

const Anchor = styled.a`
  text-decoration: none;
  color: inherit;
  outline-offset: 4px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 300px;
  border-radius: 2px;
  margin-bottom: 8px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center center;
`;

const Tags = styled.ul`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Tag = styled.li`
  display: inline;
  padding: 4px 8px;
  background: var(--color-gray-300);
  font-size: 0.875rem;
  font-weight: 475;
  color: var(--color-gray-800);
  margin-right: 8px;
  line-height: 1.5;
`;

export default PhotoGridItem;
