up
=========================
### ✨ painless, context-aware file uploads from the command line ✨

![Demo](http://nt34.host.cs.st-andrews.ac.uk/up.mov.gif)

## installation

```
npm install -g up-cmd
```

## use

single file:

```
up file.txt
```

multiple files:

```
up file.txt
```

command output:

```
cat /usr/share/dict/words | grep "aba" | up
```

## features

* Easy upload to existing storage providers
  * [GitHub Gist](gist.github.com) for source files
  * [DropBox](dropbox.com) for everything else
  * more to be added soon!
* Configuration through `~/.up.json`

## Contributing

Feel free to contribute by [requesting a feature](https://github.com/NickTikhonov/up/issues/new), [submitting a bug](https://github.com/NickTikhonov/up/issues/new) or contributing code.

## License

MIT
