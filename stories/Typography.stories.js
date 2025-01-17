
export default {
  title: 'Styleguide'
};

export const Typography = () => ({
  template: `
    <div class="sb__story-container">
      <section class="sb__group">
        <h2 class="sb__header">Headings</h2>
        <h1>Heading 1 <a href="#">link</a> <a href="https://example.org" target="_blank" rel="noopener">external link</a></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas, diam sit amet faucibus dictum, turpis libero porttitor diam, id pellentesque orci augue adipiscing risus. Nulla id lacus eros. Nam porttitor semper enim, sit amet vestibulum arcu adipiscing sed. Proin dignissim, ligula id rhoncus fringilla, nunc lectus luctus magna, vitae cursus neque arcu id risus. Phasellus eu risus quis mauris consectetur luctus. Sed facilisis diam mauris, a vulputate ligula. Sed nec purus mauris. Nulla euismod massa ac nisl gravida dictum. Fusce leo turpis, accumsan non ultricies sed, consectetur id dui. Suspendisse porttitor odio in ipsum dignissim mollis.</p>
        <h2>Heading 2 <a href="#">link</a> <a href="https://example.org" target="_blank" rel="noopener">external link</a></h2>
        <p>Nam posuere augue et leo rutrum condimentum. Etiam a odio blandit odio aliquam hendrerit. In hac habitasse platea dictumst. Ut iaculis facilisis justo, a elementum felis imperdiet et. Vestibulum gravida volutpat condimentum. Aliquam condimentum, turpis eu tempus iaculis, neque risus cursus mauris, id lacinia elit eros ut diam. Curabitur lobortis pellentesque posuere. Aliquam magna eros, auctor vitae faucibus sit amet, ullamcorper a est. In hac habitasse platea dictumst. Vestibulum condimentum dui eu mi pretium adipiscing. Ut dictum vestibulum imperdiet.</p>
        <h3>Heading 3 <a href="#">link</a> <a href="https://example.org" target="_blank" rel="noopener">external link</a></h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas,  diam sit amet faucibus dictum, turpis libero porttitor diam, id pellentesque orci augue adipiscing risus. Nulla id lacus eros. Nam porttitor semper enim, sit amet vestibulum arcu adipiscing sed. Proin dignissim, ligula id rhoncus fringilla, nunc lectus luctus magna, vitae cursus neque arcu id risus. Phasellus eu risus quis mauris consectetur luctus. Sed facilisis diam mauris, a vulputate ligula. Sed nec purus mauris. Nulla euismod massa ac nisl gravida dictum. Fusce leo turpis, accumsan non ultricies sed, consectetur id dui. Suspendisse porttitor odio in ipsum dignissim mollis.</p>
        <h4>Heading 4 <a href="#">link</a> <a href="https://example.org" target="_blank" rel="noopener">external link</a></h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie malesuada diam eu rhoncus. Aliquam justo elit, convallis sed eleifend condimentum, ornare at nisl. Sed at leo euismod velit egestas ultricies vel quis purus. Morbi accumsan fermentum ipsum convallis rhoncus. Aenean tincidunt, neque sed consequat pulvinar, sem felis ornare lectus, ac mattis purus eros vitae mauris. Vestibulum in metus sed nisi imperdiet faucibus ac sit amet orci. Duis sit amet tincidunt libero. Duis risus purus, rutrum eget bibendum et, faucibus sed magna. Donec metus nunc, eleifend id sollicitudin vitae, blandit pulvinar nisl. Ut adipiscing pretium mi vel malesuada. Aliquam id quam lectus. Duis fringilla purus eget ipsum semper iaculis. Nullam nec mauris leo, eu posuere lacus. Maecenas turpis massa, egestas et vestibulum ac, rutrum nec sapien. Nam consequat varius enim, quis congue quam elementum vel. Proin eleifend lobortis arcu, quis dignissim orci consequat sed. Nunc vel libero in lorem hendrerit adipiscing sit amet non eros. Praesent eget eros est.</p>
        <h5>Heading 5 <a href="#">link</a> <a href="https://example.org" target="_blank" rel="noopener">external link</a></h5>
        <p>Duis lectus dolor, euismod eu adipiscing sit amet, fringilla ut augue. Pellentesque tristique condimentum iaculis. Aliquam erat volutpat. Donec nec sapien urna. Vivamus nec felis dui, ut porta mauris. In mollis porttitor ipsum, vitae elementum erat lacinia imperdiet. Sed ut sem ut erat convallis pretium. Vestibulum nec orci nec urna ullamcorper tincidunt. Integer at massa sit amet orci cursus varius. Curabitur eu ipsum massa, at condimentum justo.</p>
        <h6>Heading 6 <a href="#">link</a> <a href="https://example.org" target="_blank" rel="noopener">external link</a></h6>
        <p>Duis lectus dolor, euismod eu adipiscing sit amet, fringilla ut augue. Pellentesque tristique condimentum iaculis. Aliquam erat volutpat. Donec nec sapien urna. Vivamus nec felis dui, ut porta mauris. In mollis porttitor ipsum, vitae elementum erat lacinia imperdiet. Sed ut sem ut erat convallis pretium. Vestibulum nec orci nec urna ullamcorper tincidunt. Integer at massa sit amet orci cursus varius. Curabitur eu ipsum massa, at condimentum justo.</p>
      </section>
      <hr>
      <section class="group">
        <h2 class="group__header">General styles</h2>
        <p><a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit. Nam egestas, diam sit amet faucibus dictum, turpis libero porttitor diam, id  pellentesque orci augue adipiscing risus. Nulla id lacus eros. Nam  porttitor semper enim, sit amet vestibulum arcu adipiscing sed. Proin  dignissim, ligula id rhoncus fringilla, nunc lectus luctus magna, vitae  cursus neque arcu id risus. Phasellus eu risus quis mauris consectetur  luctus. Sed facilisis diam mauris, a vulputate ligula. Sed nec purus  mauris. Nulla euismod massa ac nisl gravida dictum. Fusce leo turpis,  accumsan non ultricies sed, consectetur id dui. Suspendisse porttitor  odio in ipsum dignissim mollis.</p>
        <p><a href="https://example.org" target="_blank" rel="noopener">Maecenas id dolor odio eu</a> elementum augue. Suspendisse odio nisi,  aliquet eu tempus quis, rutrum quis sem. Nulla volutpat cursus dolor  tempus consectetur. <span style="text-decoration: line-through;">Proin faucibus, nulla at sodales interdum, lectus  lectus aliquet risus, ut rutrum velit ligula eget ligula. Sed volutpat,  elit non condimentum interdum, purus velit feugiat augue, id cursus  felis dui sed diam. Proin in lobortis tellus. Nullam fringilla dapibus  urna et pretium. Proin ac ligula ut purus luctus blandit ac ac lacus.</span>  Etiam molestie <small>consectetur felis vitae mollis. Pellentesque semper  bibendum lectus, molestie porta odio aliquet vehicula. Nunc et volutpat  arcu.</small> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices  posuere cubilia Curae; Cras pretium mauris eu dolor molestie hendrerit.  Duis lectus leo, gravida sed ullamcorper eu, pretium eu augue.  <b>Vestibulum eleifend, velit et dapibus dapibus, justo quam dictum diam,  ac euismod augue ipsum ac leo.</b> Aliquam erat volutpat. Morbi a mi ac urna  tincidunt fermentum consectetur sit amet arcu.</p>
        <p>ĀĒĪŌŪāēīōū. He aha ngā mahi a te rongoā.</p>
        <p><b>ĀĒĪŌŪāēīōū. He aha ngā mahi a te rongoā.</b></p>
        <p><em>ĀĒĪŌŪāēīōū. He aha ngā mahi a te rongoā.</em></p>
        <p><small>ĀĒĪŌŪāēīōū. He aha ngā mahi a te rongoā.</small></p>
      </section>
      <section class="group">
        <h2 class="group__header">Blockquote</h2>
        <blockquote>Sed facilisis diam mauris, a vulputate ligula. Sed nec purus mauris. Nulla euismod massa ac nisl gravida dictum. Fusce leo turpis, accumsan non ultricies sed, consectetur id dui.</blockquote>
        <blockquote><p>Sed facilisis diam mauris, a vulputate ligula. Sed nec purus mauris.</p><p>Nulla euismod massa ac nisl gravida dictum. Fusce leo turpis, accumsan non ultricies sed, consectetur id dui.</p></blockquote>
      </section>
      <section class="group">
        <h2 class="group__header">Lead</h2>
        <p class="lead">Duis lectus dolor, euismod eu adipiscing sit amet, fringilla ut augue. Pellentesque tristique condimentum iaculis. Aliquam erat volutpat. Donec nec sapien urna. Vivamus nec felis dui, ut porta mauris. In mollis porttitor ipsum, vitae elementum erat lacinia imperdiet. Sed ut sem ut erat convallis pretium. Vestibulum nec orci nec urna ullamcorper tincidunt. Integer at massa sit amet orci cursus varius. Curabitur eu ipsum massa, at condimentum justo.</p>
      </section>
      <section class="group">
        <h2 class="group__header">Large</h2>
        <p class="large">Duis lectus dolor, euismod eu adipiscing sit amet, fringilla ut augue. Pellentesque tristique condimentum iaculis. Aliquam erat volutpat. Donec nec sapien urna. Vivamus nec felis dui, ut porta mauris. In mollis porttitor ipsum, vitae elementum erat lacinia imperdiet. Sed ut sem ut erat convallis pretium. Vestibulum nec orci nec urna ullamcorper tincidunt. Integer at massa sit amet orci cursus varius. Curabitur eu ipsum massa, at condimentum justo.</p>
      </section>
    </div>
    `,
});
