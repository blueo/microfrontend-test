# Linkfield WIP

The [Linkfield module](https://github.com/silverstripe/silverstripe-linkfield) is kind of a high functioning work in
progress, and there is one key "rough edge" that's worth being aware of.

The module works **really well** for `has_one` relationships, there is a really nice author interface, and it all just
looks fantastic. Unfortunately, there is no great interface for managing `has_many` relationships. For a `has_many`
relationship, (at least for now) you have to use a `GridField`. There is nothing *difficult* about that (from a 
developer p.o.v.), it's just not a great author experience.

The plan is for the Silverstripe linkfield to get a nice "multi-link manager" for `has_many` relationships, and this is
the "sales pitch" that we can use to clients. **Yes**, there are some other link modules out there, but this is the one
that's going to be getting support going forward.
