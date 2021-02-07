import { get, paragraphs } from '../../shared/SharedFunctions';

// Fetch posts and populate component state array
export const fetchMediaContent = (props, setPosts, callback) => {
  // Wait for all posts and trigger update to list by setting flag
  const image = { cancelled: false, height: 359, uri: 'https://bit.ly/3sAOAp8', type: 'image', width: 640 };
  // Using lorem ipsum data for now with single post
  get('https://baconipsum.com/api/?type=all-meat&sentences=3')
    .then(description => setPosts([{ id: 1, title: `Example Post`, description, image }]))
    .catch(() => props.snackbar('Unable to fetch posts'))
    .finally(callback)
};

// Handle submit of media content form to create or update media content record
export const submitMediaContent = (props, title, description, image, setSaving) => {
  // Check for required fields
  if (title.trim() === '') {
    props.snackbar('Post title is required');
    return;
  }
  if (description.trim() === '') {
    props.snackbar('Post description is required');
    return;
  }
  if (!image) {
    props.snackbar('No photo or video selected');
    return;
  }
  // Create or update record depending on whether an existing record was given as payload
  props.setPosts(
    props.payload
      // Find and update existing record
      ? props.posts.map(post =>
        post.id === props.payload.id
          ? { ...post, title, description: paragraphs(description), image }
          : post)
      // Append new record
      : [
        ...props.posts,
        { id: props.posts.length + 1, title, description: paragraphs(description), image }
      ]);
  // Exit page, return to previous
  props.navigation.pop();
};

// Handle confirmation step to delete new story record
export const deleteMediaContent = (props, post, posts, setPosts, setFetched, callback) =>
  setPosts(posts.filter(p => p.id !== post.id));