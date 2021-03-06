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


specify your preferred provider:
```
up --provider transfer-sh file.txt
```

## features

* Easy upload to existing storage providers
  * [GitHub Gist](http://gist.github.com) for source files
  * [DropBox](http://dropbox.com) for everything else
  * [Transfer.sh](https://transfer.sh/) and [Rust playground](https://play.rust-lang.org/) can be used using the `--provider` flag
  * more to be added soon!
* Configuration through `~/.up.json`

## Contributing

Feel free to contribute by [requesting a feature](https://github.com/NickTikhonov/up/issues/new), [submitting a bug](https://github.com/NickTikhonov/up/issues/new) or contributing code.

## Authors

* Nick Tikhonov
* Alex Ungurianu

## License

MIT
