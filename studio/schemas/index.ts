import {defineField, defineType} from "sanity";
import {Step} from "../../types";

function hideIf(type: Step['type'] = 'choose') {

  return ({document}) => document.type === type
}

export default [

  defineType({
    name: 'content',
    title: 'Content',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
          {title: 'Quote', value: 'blockquote'}
        ]
      }
    ]
  }),

  defineType({
    name: 'input',
    title: 'Input',
    type: "document",
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Title'
      })
    ]
  }),
  defineType({
    name: 'topic',
    title: 'Topic',
    type: "document",
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Title'
      })
    ]
  }),
  defineType({
    name: 'item',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: "Title"
      }),
      defineField({
        name: 'shortTitle',
        type: 'string',
        title: "Titolo breve"
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        title: "Slug",
        options: {
          source: 'title'
        },
        validation: R => R.required()
      }),
      defineField({
        name: 'description',
        type: 'string',
        title: "Description"
      }),
      defineField({
        name: 'content',
        type: 'content',
        title: "Content"
      }),
      defineField({
        name: 'showIf',
        title: "Requires",
        type: 'array',
        of: [{
          type: 'reference',
          to: [{
            type: 'item'
          }]
        }]

      }),
      defineField({
        name: 'hiddenIf',
        title: "Nascondi se",
        type: 'array',
        of: [{
          type: 'reference',
          to: [{
            type: 'item'
          }]
        }]
      }),
    ]
  }),
  defineType({
    title: "Flow",
    type: 'document',
    name: 'flow',
    preview: {
      select: {
        title: 'title',
        favorite: 'favorite',
      },
      prepare(selection) {
        const {title, favorite} = selection
        return {
          title: `${favorite ? '✨ ' : ''}${title}`,
          // subtitle: date.split('-')[0] // YYYY-MM-DD --> YYYY
        }
      }
    },
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: "Title",
        validation: R => R.required()
      }),
      defineField({
        name: 'fields',
        title: 'Domini',
        type: 'array',
        of: [
          {
            type: 'reference', to: [{type: 'field'}]
          }
        ]
      }),
      defineField({
        name: 'description',
        type: 'string',
        title: "Description"
      }),
      defineField({
        name: 'favorite',
        type: 'boolean',
        title: 'Preferito'
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        title: "Slug",
        options: {
          source: 'title'
        },
        validation: R => R.required()
      }),
      defineField({
        name: 'steps',
        type: 'array',
        of: [
          {
            type: 'reference', to: [{type: 'step'}]
          }
        ]
      }),
      defineField({
        name: 'inputs',
        type: 'array',
        of: [
          {
            type: 'reference', to: [{type: 'input'}]
          }
        ]
      }),
      defineField({
        name: 'topics',
        type: 'array',
        of: [
          {
            type: 'reference', to: [{type: 'topic'}]
          }
        ]
      }),
    ]
  }),
  defineType({
    type: 'document',
    name: 'step',
    title: "Step",
    preview: {
      select: {
        title: 'title',
        _note: 'note',
        if0: 'showIf.0.title',
        if1: 'showIf.1.title',
        if2: 'showIf.2.title',
        if3: 'showIf.3.title',
      },
      prepare(selection) {
        const {title, _note} = selection

        return {
          title,
          subtitle: _note
        }
      }
    },
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: "Title"
      }),
      defineField({
        name: 'description',
        type: 'string',
        title: "Description"
      }),
      defineField({
        name: 'content',
        type: 'content',
        title: "Description"
      }),
      defineField({
        type: 'string',
        name: 'type',
        validation: R => R.required(),
        initialValue: 'choose',
        options: {
          layout: "radio",
          list: [
            'choose', 'text', 'know'
          ]
        }
      }),
      defineField({
        name: 'note',
        type: 'string',
        title: "Note (interne)"
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        title: "Slug",
        options: {
          source: 'title'
        },
        validation: R => R.required()
      }),
      defineField({
        type: 'array',
        name: 'items',
        //   hidden: hideIf('know'),
        of: [
          {
            type: 'reference', to: [{type: 'item'}]
          }
        ]
      }),
      defineField({
        name: 'showIf',
        title: "Requires",
        type: 'array',
        of: [{
          type: 'reference',
          to: [{
            type: 'item'
          }]
        }],

      }),
      defineField({
        name: 'hiddenIf',
        title: "Nascondi se",
        type: 'array',
        of: [{
          type: 'reference',
          to: [{
            type: 'item'
          }]
        }]
      }),
    ]
  }),

  defineType({
    type: 'document',
    name: 'field',
    title: 'Dominio',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'title'
      })
    ]
  })
]