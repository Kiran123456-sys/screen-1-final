function isCommaSeparated(input: string): boolean {
  const regex = /^([^, ]+(,[^, ]+)*)$/;
  return regex.test(input);
}


export default function(elements) {
    let title=elements.title.value.trim();
    let tags = elements.tags.value.trim();
    let description = elements.description.value.trim();
    let authentication_key = elements.authenticationKey.value.trim();
    console.log(title, tags, description);
    let validationErrors= {
      title: '',
      tags: '',
      description: '',
      authentication_key: '',
      thumbnail_image: '',
      source_file: ''
    } ;
    
    let max_title_length = 20;
    if(title.length==0) {
      validationErrors['title']='title is required';
    }
    if(title.length>=max_title_length) {
      validationErrors['title']=`title cannot be more than {max_title_length} characters`;
    }

    if(!isCommaSeparated(tags)) {
      validationErrors['tags']='tags are not comma separated';
    }

    if(authentication_key=='') {
      validationErrors['authentication_key']='authentication key is required';
    }
    return validationErrors;
};