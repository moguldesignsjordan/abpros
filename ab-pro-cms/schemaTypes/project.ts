import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Project Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: (r) => r.required()}),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: {list: ['Complete Rehabs', 'Renovations', 'Commercial', 'Maintenance', 'Project Management']},
      validation: (r) => r.required(),
    }),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'gallery', title: 'Photo Gallery', type: 'array', of: [{type: 'image', options: {hotspot: true}, fields: [{name: 'caption', type: 'string', title: 'Caption'}]}]}),
    defineField({name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2, description: '1-2 sentences for project cards', validation: (r) => r.max(200)}),
    defineField({name: 'description', title: 'Full Description', type: 'array', of: [{type: 'block'}, {type: 'image', options: {hotspot: true}, fields: [{name: 'caption', type: 'string', title: 'Caption'}]}]}),
    defineField({name: 'completionDate', title: 'Completion Date', type: 'date'}),
    defineField({name: 'client', title: 'Client', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'featured', title: 'Featured Project', type: 'boolean', initialValue: false, description: 'Show on homepage'}),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'coverImage'},
  },
})
