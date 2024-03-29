import {defineField, defineType} from "sanity";
import {Step} from "../../types";

function hideIf(type: Step['layout'] | Step['layout'][] = 'choose') {

  let arr = Array.isArray(type) ? type : [type]

  return ({document}) => arr.includes(document.layout)
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
        ],
        marks: {
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'link',
              fields: [
                {
                  name: 'url',
                  type: 'url'
                }
              ]
            },
            {
              name: 'editable',
              type: 'object',
              title: 'Editable',
              fields: [
                {
                  name: 'id',
                  type: 'string',
                  title: 'Identifier'
                },

                {
                  name: 'replace',
                  type: 'array',
                  title: 'Replace',
                  of: [{type: 'string'}]
                },

              ]
            }
          ]

        }
      },

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
        type: 'content',
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
        type: 'image',
        name: 'coverImg',
        title: 'Cover'
      }),
      defineField({
        type: 'image',
        name: 'networkImg',
        title: 'Network'
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
    name: 'step',
    type: 'document',
    title: "Step",
    preview: {
      select: {
        title: 'title',
        type: 'type',
        _note: 'note',
        if0: 'showIf.0.title',
        if1: 'showIf.1.title',
        if2: 'showIf.2.title',
        if3: 'showIf.3.title',
      },
      prepare(selection) {
        const {title, _note, type} = selection

        let subtitle = type;

        if (_note) {
          subtitle += ' | ' + _note
        }

        return {
          title,
          subtitle
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
        name: 'shortTitle',
        type: 'string',
        title: "Titolo breve"
      }),
      defineField({
        name: 'content',
        type: 'content',
        title: "Description"
      }),
      defineField({
        name: 'label',
        type: 'string',
        title: "Label",
        description: "Used for optional steps"
      }),
      defineField({
        type: 'string',
        name: 'layout',
        validation: R => R.required(),
        options: {
          layout: "radio",
          list: [
            'choose', 'text', 'know', 'section', 'options'
          ]
        }
      }),
      defineField({
        type: 'string',
        name: 'theme',
        options: {
          layout: "radio",
          list: [
            'default', 'blue', 'green'
          ]
        }
      }),
      defineField({
        name: 'image',
        type: 'image',
        title: 'Illustrazione'
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
        name: 'toolsLabel',
        type: 'string',
        hidden: hideIf(['choose', 'text', 'section']),
      }),
      defineField({
        name: 'tools',
        type: "array",
        hidden: hideIf(['choose', 'text', 'section']),
        of: [{
          type: 'tool'
        }]
      }),
      defineField({
        type: 'array',
        name: 'items',
        hidden: hideIf(['text']),
        of: [
          {
            type: 'reference', to: [{type: 'item'}]
          }
        ]
      }),
      defineField({
        type: 'array',
        name: 'options',
        hidden: ({document}) => document.layout !== 'options',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                type: 'string',
                title: 'Title'
              }),
              defineField({
                name: 'content',
                type: 'content',
                title: 'Content',
                validation: V => V.required(),
              }),
              defineField({
                name: 'step',
                type: 'reference',
                validation: V => V.required(),
                to: [{type: 'step'}]
              })
            ]
          },
        ]
      }),
      defineField({
        name: 'showIf',
        title: "Requires",
        type: 'array',
        hidden: hideIf('text'),
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
        name: 'recommended',
        type: 'boolean',
        title: 'Raccomandato'
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
    name: 'tool',
    type: 'document',
    title: 'Tool',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Title'
      }),
      defineField({
        name: 'shortDescription',
        type: 'string',
        title: 'Description'
      }),
      defineField({
        name: 'link',
        type: 'url',
        title: 'Link'
      })
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
      }),
    ]
  }),

  defineType({
    name: 'field',
    type: 'document',
    title: 'Dominio',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'title'
      })
    ]
  }),

  defineType({
    name: 'glossary',
    type: "document",
    title: "Glossario",
    fields: [
      defineField({
        name: 'word',
        title: 'Word',
        type: 'string',
        validation: V => V.required()
      }),
      defineField({
        name: 'display',
        title: 'Display',
        type: 'string'
      }),
      defineField({
        name: 'content',
        type: 'content',
        title: 'Descrizione'
      })
    ]
  })
]
