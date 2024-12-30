import React from 'react';
import {
  Field,
  ImageField,
  Placeholder,
  Text,
  RichText,
  RichTextField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ParallaxBackgroundImage } from 'components/NonSitecore/ParallaxBackgroundImage';
import Head from 'next/head';

interface Fields {
  Title: Field<string>;
  Excerpt: Field<string>;
  Ingredients: RichTextField;
  CookingInstructions: RichTextField;
  NutritionalFacts: RichTextField;
  Thumbnail: ImageField;
  BackgroundImage: ImageField;
  Name: Field<string>;
  Photo: ImageField;
  Position: Field<string>;
  PrepTime: Field<string>;
  CookTime: Field<string>;
  TotalTime: Field<string>;
  Servings: Field<string>;
}

export type PageBackgroundProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PageBackgroundProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <>
      <Head>
        <meta property="og:description" content={props.fields?.Excerpt.value} />
        <meta property="og:name" content={props.fields?.Title?.value} />
        <meta property="og:title" content={props.fields?.Title?.value} />
        <meta property="og:image" content={props.fields?.Thumbnail?.value?.src} />
        <meta property="og:type" content="article" />
      </Head>
      <div
        className={`component article-details page-background spaced-top col-12 ${props.params?.styles?.trimEnd()}`}
        id={id ? id : undefined}
      >
        <ParallaxBackgroundImage BackgroundImage={props.fields.BackgroundImage} />

        <div className="container">
          <Placeholder name="page-navigation" rendering={props.rendering} />
        </div>

        <div>
          <div className="background-content component-spaced container rounded-corners">
            <div className="p-3 p-sm-5">
              <div className="article-content">
                <div className="row row-gap-4 gx-5">
                  <div className="col-12 col-lg-6">
                    <NextImage
                      field={props.fields.Thumbnail}
                      className="article-img img-fluid"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="row">
                      <Placeholder name="article-meta" rendering={props.rendering} />
                    </div>
                    <div className="row">
                      Prep time: <Text field={props.fields.PrepTime} />
                      Cook time: <Text field={props.fields.CookTime} />
                      Servings: <Text field={props.fields.Servings} />
                    </div>
                    <h1 className="article-title">
                      <Text field={props.fields.Title} />
                    </h1>
                    <p className="article-excerpt">
                      <Text field={props.fields.Excerpt} />
                    </p>
                  </div>
                </div>
                <h2>Ingredients</h2>
                <div className="article-content-body mt-5">
                  <RichText field={props.fields.Ingredients} />
                </div>
                <h2>Cooking Instructions</h2>
                <div className="article-content-body mt-5">
                  <RichText field={props.fields.CookingInstructions} />
                </div>
                <h2>Nutritional Facts</h2>
                <div className="article-content-body mt-5">
                  <RichText field={props.fields.NutritionalFacts} />
                </div>
              </div>
              <div className="row">
                <Placeholder name="background-page-content" rendering={props.rendering} />
              </div>
            </div>
          </div>
          <Placeholder name="page-content" rendering={props.rendering} />
        </div>
      </div>
    </>
  );
};
