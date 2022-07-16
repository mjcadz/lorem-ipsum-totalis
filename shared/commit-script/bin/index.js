#! /usr/bin/env node

import inquirer from 'inquirer'
import shell from 'shelljs'
import chalk from 'chalk'

const conventionalEmojiTypes = [
  {
    name: 'feat',
    emoji: '🌱',
    code: ':seedling:',
  },
  {
    name: 'fix',
    emoji: '🙏',
    code: ':pray:',
  },
  {
    name: 'docs',
    emoji: '🍉',
    code: ':watermelon:',
  },
  {
    name: 'style',
    emoji: '✨',
    code: ':sparkles:',
  },
  {
    name: 'refactor',
    emoji: '🔥',
    code: ':fire:',
  },
  {
    name: 'perf',
    emoji: '⚡',
    code: ':zap:',
  },
  {
    name: 'test',
    emoji: '🔮',
    code: ':crystal_ball:',
  },
  {
    name: 'build',
    emoji: '🍞',
    code: ':bread:',
  },
  {
    name: 'ci',
    emoji: '🐳',
    code: ':whale:',
  },
  {
    name: 'chore',
    emoji: '👏',
    code: ':clap:',
  },
  {
    name: 'revert',
    emoji: '🙃',
    code: ':upside_down_face:',
  },
]

inquirer
  .prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Commit type:',
      choices: conventionalEmojiTypes.map((type) => `${type.emoji} ${type.name}`),
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Commit scope:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Commit description:',
    },
  ])
  .then((answers) => {
    const emojiType = conventionalEmojiTypes.find((x) => (x.name = answers.type.split(' ')[1]))
    const conventionalCommit = `${emojiType.code} ${emojiType.name}(${answers.scope}): ${answers.description}`
    console.log(chalk.magenta(`\n${conventionalCommit}\n`))

    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'correct',
          message: 'Commit with this message?',
        },
      ])
      .then((answers) => {
        if (answers.correct) {
          shell.exec(`git commit -m "${conventionalCommit}"`)
          shell.exec(`git push`)
        }
      })
  })
