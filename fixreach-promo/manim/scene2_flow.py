from manim import *
BG="#0B0F19"; ORANGE="#F97316"; GREEN="#10B981"; RED="#EF4444"; CARD="#111827"; WHITE="#F9FAFB"
class Scene2Flow(Scene):
    def construct(self):
        self.camera.background_color=BG
        title=Text("CUSTOMERS COMPARE PRICES",font_size=34,color=ORANGE,weight=BOLD).to_edge(UP)
        quote=RoundedRectangle(corner_radius=.18,width=11.8,height=2.35,color=RED,fill_color=CARD,fill_opacity=1,stroke_width=3)
        qtxt=Text("“Bhaiya, doosre wale ne toh ₹200 kam bola hai!”",font_size=34,color=WHITE,weight=BOLD).scale_to_fit_width(10.8)
        price=Arrow(LEFT*1.3,RIGHT*1.3,color=RED,stroke_width=8).rotate(-PI/4).next_to(qtxt,DOWN,buff=.15)
        quote_group=VGroup(quote,qtxt,price)
        self.play(Write(title),FadeIn(quote_group,shift=UP),run_time=2)
        self.wait(2)
        self.play(FadeOut(quote_group),FadeOut(title))
        house=VGroup(Polygon(LEFT*1.2+DOWN*.5,UP*1.0,RIGHT*1.2+DOWN*.5,color=ORANGE,fill_opacity=.12),Square(side_length=1.6,color=ORANGE).shift(DOWN*.9),Text("AC",font_size=24,color=WHITE).shift(DOWN*.85))
        phone=RoundedRectangle(width=2.1,height=3.6,corner_radius=.25,color=WHITE,fill_color=CARD,fill_opacity=1)
        screen=RoundedRectangle(width=1.75,height=2.65,corner_radius=.12,color=ORANGE,fill_color=BG,fill_opacity=1).move_to(phone)
        feed=VGroup(*[RoundedRectangle(width=1.4,height=.56,corner_radius=.08,color="#1F2937",fill_color="#1F2937",fill_opacity=1) for _ in range(3)]).arrange(DOWN,buff=.12).move_to(screen)
        call=RoundedRectangle(width=1.5,height=.48,corner_radius=.12,color=GREEN,fill_color=GREEN,fill_opacity=1).next_to(screen,DOWN,buff=.14)
        calltxt=Text("CALL NOW",font_size=17,color=BG,weight=BOLD).move_to(call)
        arrow=Arrow(RIGHT*1.6,RIGHT*3,color=GREEN,stroke_width=8)
        group=VGroup(house,arrow,phone,screen,feed,call,calltxt).arrange(RIGHT,buff=.55).scale(.83)
        labels=Text("LOCAL REPAIR NEED → SOCIAL FEED → DIRECT CALL",font_size=26,color=WHITE,weight=BOLD).to_edge(DOWN)
        self.play(FadeIn(group,shift=UP),Write(labels),run_time=3)
        self.wait(12)
